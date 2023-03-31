import { CreatorCreateUpdateDTO, CreatorDTO } from "../../types";
import logger from "../../utilities/logger";
import { getErrorMessage } from "../../utilities/errorResponse";
import ICreatorService from "../interfaces/creatorService";
import Creator from "../../models/creator.model";
import { isAuthorizedByRole } from "../../middlewares/auth";
import IEmailService from "../interfaces/emailService";

const Logger = logger(__filename);

function isOverlap(ageRange: string, ageRangeCmp: string): boolean {
  const lowerInclusiveBound = parseInt(ageRange.split(",")[0].slice(1), 10);
  const upperExclusiveBound = parseInt(ageRange.split(",")[1].slice(0, -1), 10);

  const lowerInclusiveBoundCmp = parseInt(
    ageRangeCmp?.split(",")[0].slice(1),
    10,
  );
  const upperExclusiveBoundCmp = parseInt(
    ageRangeCmp?.split(",")[1].slice(0, -1),
    10,
  );

  return (
    Math.max(lowerInclusiveBound, lowerInclusiveBoundCmp) <=
    Math.min(upperExclusiveBound, upperExclusiveBoundCmp)
  );
}

class CreatorService implements ICreatorService {
  emailService: IEmailService | null;

  constructor(emailService: IEmailService | null = null) {
    this.emailService = emailService;
  }

  /* eslint-disable class-methods-use-this */
  async getCreatorById(
    creatorId: string,
    isUserId?: boolean,
  ): Promise<CreatorDTO> {
    let creator: Creator | null;
    const isAdmin = !isAuthorizedByRole(new Set(["Admin"]));
    try {
      if (isUserId) {
        creator = await Creator.findOne({ where: { user_id: creatorId } });
      } else {
        creator = await Creator.findByPk(Number(creatorId));
      }
      if (isAdmin && creator?.is_approved === false) {
        throw new Error("No creator was found.");
    }

      if (!creator) {
        throw new Error(`creatorId ${creatorId} not found.`);
      }
    } catch (error) {
      Logger.error(`Failed to get creator. Reason = ${getErrorMessage(error)}`);
      throw error;
    }
    return {
      id: creator.id,
      userId: creator.user_id,
      location: creator.location,
      rate: creator.rate,
      genre: creator.genre,
      ageRange: creator.age_range,
      timezone: creator.timezone,
      bio: creator.bio,
      isApproved: creator.is_approved,
      firstName: creator.first_name,
      lastName: creator.last_name,
      email: creator.email,
      phone: creator.phone,
      streetAddress: creator.street_address,
      city: creator.city,
      province: creator.province,
      postalCode: creator.postal_code,
      craft: creator.craft,
      website: creator.website,
      profilePictureLink: creator.profile_picture_link,
      availability: creator.availability,
      bookCovers: creator.book_covers,
      publications: creator.publications,
      isReadyForReview: creator.isReadyForReview,
      publications: creator.publications,
    };
  }

  async getCreators({
    status,
    genres,
    location,
    ageRange,
    provinces,
    crafts,
    searchText,
  }: {
    status?: string;
    genres?: string[];
    location?: string;
    ageRange?: string;
    provinces?: string[];
    crafts?: string[];
    searchText?: string;
  }): Promise<Array<CreatorDTO>> {
    const isAdmin = !!isAuthorizedByRole(new Set(["Admin"]));
    try {
      const creators: Array<Creator> = await Creator.findAll({ raw: true });

      return creators
        .map((creator) => ({
          id: creator.id,
          userId: creator.user_id,
          location: creator.location,
          rate: creator.rate,
          genre: creator.genre,
          ageRange: creator.age_range,
          timezone: creator.timezone,
          bio: creator.bio,
          isApproved: creator.is_approved,
          firstName: creator.first_name,
          lastName: creator.last_name,
          email: creator.email,
          phone: creator.phone,
          streetAddress: creator.street_address,
          city: creator.city,
          province: creator.province,
          postalCode: creator.postal_code,
          craft: creator.craft,
          website: creator.website,
          profilePictureLink: creator.profile_picture_link,
          availability: creator.availability,
          bookCovers: creator.book_covers,
          publications: creator.publications,
          isReadyForReview: creator.isReadyForReview,
          publications: creator.publications,
        }))
        .filter(
          (creator) =>
            (creator.isApproved || isAdmin) &&
            (status ? creator.isApproved === (status === "true") : true) &&
            (genres
              ? // ez clap
                creator.genre.filter((i) => genres.includes(i)).length > 0
              : true) &&
            (crafts
              ? creator.craft.filter((i) => crafts.includes(i)).length > 0
              : true) &&
            (provinces ? provinces.includes(creator.province) : true) &&
            (location
              ? creator.location.toLowerCase() === location.toLowerCase()
              : true) &&
            (ageRange ? isOverlap(creator.ageRange, ageRange) : true) &&
            (searchText
              ? `${creator.firstName} ${creator.lastName}`.includes(searchText)
              : true),
        );
    } catch (error) {
      Logger.error(
        `Failed to get creators. Reason = ${getErrorMessage(error)}`,
      );

      throw error;
    }
  }

  async deleteCreator(userId: string): Promise<void> {
    try {
      // Sequelize doesn't provide a way to atomically find, delete, and return deleted row
      const deletedUser: Creator | null = await Creator.findByPk(
        Number(userId),
      );

      if (!deletedUser) {
        throw new Error(`userid ${userId} not found.`);
      }

      const numDestroyed: number = await Creator.destroy({
        where: { id: userId },
      });

      if (numDestroyed <= 0) {
        throw new Error(`userid ${userId} was not deleted in Postgres.`);
      }
    } catch (error) {
      Logger.error(
        `Failed to delete creator. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }

  async approveCreator(userId: string): Promise<void> {
    try {
      await Creator.update(
        {
          is_approved: true,
          isReadyForReview: false,
        },
        {
          where: { id: parseInt(userId, 10) },
        },
      );
    } catch (error) {
      Logger.error(
        `Failed to approve user. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }

  async rejectCreator(userId: string): Promise<void> {
    try {
      if (!this.emailService) {
        const errorMessage =
          "Attempted to call sendCreatorProfileSetupLink but this instance of CreatorService does not have an EmailService instance";
        Logger.error(errorMessage);
        throw new Error(errorMessage);
      }

      const rejectedUser: Creator | null = await Creator.findByPk(
        Number(userId),
      );

      if (!rejectedUser) {
        return;
      }

      await Creator.update(
        {
          is_approved: false,
          isReadyForReview: false,
        },
        {
          where: { id: parseInt(userId, 10) },
        },
      );

      try {
        const emailBody = `
        Hello ${rejectedUser.first_name},
        <br><br>
        Unfortunately, your creator profile for the Canadian Children's Book Centre creator directory has been declined. We encourage you to check over your profile again and contact us if further assistance is required.
        <br><br>
        Thanks,<br>CCBC`;

        this.emailService.sendEmail(
          rejectedUser.email,
          "Update on your creator status",
          emailBody,
        );
      } catch (error) {
        Logger.error(
          `Failed to generate email rejection link for user with email ${rejectedUser.email}`,
        );
        throw error;
      }
    } catch (error) {
      Logger.error(`Failed to reject user. Reason = ${getErrorMessage(error)}`);
      throw error;
    }
  }

  async createCreator(userId: number): Promise<CreatorDTO> {
    try {
      // Only allow creation w no data
      const newCreator = await Creator.create({
        user_id: userId,
      });
      return {
        id: newCreator.id,
        userId: newCreator.user_id,
        location: newCreator.location,
        rate: newCreator.rate,
        genre: newCreator.genre,
        ageRange: newCreator.age_range,
        timezone: newCreator.timezone,
        bio: newCreator.bio,
        isApproved: newCreator.is_approved,
        firstName: newCreator.first_name,
        lastName: newCreator.last_name,
        email: newCreator.email,
        phone: newCreator.phone,
        streetAddress: newCreator.street_address,
        city: newCreator.city,
        province: newCreator.province,
        postalCode: newCreator.postal_code,
        craft: newCreator.craft,
        website: newCreator.website,
        profilePictureLink: newCreator.profile_picture_link,
        availability: newCreator.availability,
        bookCovers: newCreator.book_covers,
        publications: newCreator.publications,
        isReadyForReview: newCreator.isReadyForReview,
        publications: newCreator.publications,
      };
    } catch (error) {
      Logger.error(
        `Failed to create creator. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }

  async updateCreator(
    id: number,
    creator: CreatorCreateUpdateDTO,
  ): Promise<CreatorDTO> {
    try {
      const updateResult = await Creator.update(
        {
          user_id: creator.userId,
          location: creator.location,
          rate: creator.rate,
          genre: creator.genre,
          age_range: creator.ageRange,
          timezone: creator.timezone,
          bio: creator.bio,
          is_approved: false,
          first_name: creator.firstName,
          last_name: creator.lastName,
          email: creator.email,
          phone: creator.phone,
          street_address: creator.streetAddress,
          city: creator.city,
          province: creator.province,
          postal_code: creator.postalCode,
          craft: creator.craft,
          website: creator.website,
          profile_picture_link: creator.profilePictureLink,
          availability: creator.availability,
          publications: creator.publications,
          book_covers: creator.bookCovers,
          isReadyForReview: creator.isReadyForReview,
        },
        {
          where: { id },
          returning: true,
        },
      );
      if (updateResult[0] < 1) {
        throw new Error(`id ${id} not found.`);
      }
      const updatedCreator = updateResult[1][0];

      return {
        id: updatedCreator.id,
        userId: updatedCreator.user_id,
        location: updatedCreator.location,
        rate: updatedCreator.rate,
        genre: updatedCreator.genre,
        ageRange: updatedCreator.age_range,
        timezone: updatedCreator.timezone,
        bio: updatedCreator.bio,
        isApproved: updatedCreator.is_approved,
        firstName: updatedCreator.first_name,
        lastName: updatedCreator.last_name,
        email: updatedCreator.email,
        phone: updatedCreator.phone,
        streetAddress: updatedCreator.street_address,
        city: updatedCreator.city,
        province: updatedCreator.province,
        postalCode: updatedCreator.postal_code,
        craft: updatedCreator.craft,
        website: updatedCreator.website,
        profilePictureLink: updatedCreator.profile_picture_link,
        availability: updatedCreator.availability,
        bookCovers: updatedCreator.book_covers,
        publications: updatedCreator.publications,
        isReadyForReview: updatedCreator.isReadyForReview,
        publications: updatedCreator.publications,
      };
    } catch (error) {
      Logger.error(
        `Failed to update creator. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }

  async sendCreatorProfileSetupLink(email: string): Promise<void> {
    if (!this.emailService) {
      const errorMessage =
        "Attempted to call sendCreatorProfileSetupLink but this instance of CreatorService does not have an EmailService instance";
      Logger.error(errorMessage);
      throw new Error(errorMessage);
    }

    const createProfileLink = `${process.env.CLIENT_URL}/finish-profile`;

    try {
      const emailBody = `
      Hello,
      <br><br>
      Please click the following link to set up your creator profile.
      <br><br>
      <a href=${createProfileLink}>Create Profile</a>`;

      this.emailService.sendEmail(
        email,
        "Finish your Creator Profile!",
        emailBody,
      );
    } catch (error) {
      Logger.error(
        `Failed to generate email verification link for user with email ${email}`,
      );
      throw error;
    }
  }
}

export default CreatorService;
