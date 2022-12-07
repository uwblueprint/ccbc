import { CreatorCreateUpdateDTO, CreatorDTO } from "../../types";
import logger from "../../utilities/logger";
import { getErrorMessage } from "../../utilities/errorResponse";
import ICreatorService from "../interfaces/creatorService";
import Creator from "../../models/creator.model";
import { isAuthorizedByRole } from "../../middlewares/auth";

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

  async createCreator(creator: CreatorCreateUpdateDTO): Promise<void> {
    let newCreator: Creator;
    try {
      newCreator = await Creator.create({
        user_id: creator.userId,
        location: creator.location,
        rate: creator.rate,
        genre: creator.genre,
        ageRange: creator.ageRange,
        timezone: creator.timezone,
        bio: creator.bio,
      });
    } catch (error) {
      Logger.error(
        `Failed to create creator. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }
}

export default CreatorService;
