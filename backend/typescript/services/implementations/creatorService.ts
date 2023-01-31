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
  async getCreatorById(creatorId: string): Promise<CreatorDTO> {
    let creator: Creator | null;
    const isAdmin = !isAuthorizedByRole(new Set(["Admin"]));
    try {
      creator = await Creator.findByPk(Number(creatorId));

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
    };
  }

  async getCreators({
    status,
    genre,
    location,
    ageRange,
  }: {
    status?: string;
    genre?: string;
    location?: string;
    ageRange?: string;
  }): Promise<Array<CreatorDTO>> {
    const isAdmin = !isAuthorizedByRole(new Set(["Admin"]));
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
        }))
        .filter(
          (creator) =>
            (creator.isApproved || isAdmin) &&
            (status ? creator.isApproved === (status === "true") : true) &&
            (genre
              ? creator.genre.toLowerCase() === genre.toLowerCase()
              : true) &&
            (location
              ? creator.location.toLowerCase() === location.toLowerCase()
              : true) &&
            (ageRange ? isOverlap(creator.ageRange, ageRange) : true),
        );
    } catch (error) {
      Logger.error(
        `Failed to get creators. Reason = ${getErrorMessage(error)}`,
      );

      throw error;
    }
  }

  async approveCreator(userId: string): Promise<void> {
    try {
      await Creator.update(
        {
          isApproved: true,
        },
        {
          where: { id: userId },
        },
      );
    } catch (error) {
      Logger.error(
        `Failed to approve user. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }

  async createCreator(userId: number): Promise<CreatorDTO> {
    try {
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
