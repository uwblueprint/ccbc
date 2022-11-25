import { CreatorDTO } from "../../types";
import logger from "../../utilities/logger";
import { getErrorMessage } from "../../utilities/errorResponse";
import ICreatorService from "../interfaces/creatorService";
import Creator from "../../models/creator.model";

const Logger = logger(__filename);

class CreatorService implements ICreatorService {
  /* eslint-disable class-methods-use-this */

  async getCreatorById(creatorId: string): Promise<CreatorDTO> {
    let creator: Creator | null;
    try {
      creator = await Creator.findByPk(Number(creatorId));

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
      ageGroup: creator.age_group,
      timezone: creator.timezone,
      bio: creator.bio,
      isApproved: creator.isApproved,
    };
  }

  async getCreators(): Promise<Array<CreatorDTO>> {
    try {
      const creators: Array<Creator> = await Creator.findAll({ raw: true });

      return creators.map((creator) => ({
        id: creator.id,
        userId: creator.user_id,
        location: creator.location,
        rate: creator.rate,
        genre: creator.genre,
        ageGroup: creator.age_group,
        timezone: creator.timezone,
        bio: creator.bio,
        isApproved: creator.isApproved,
      }));
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
          isApproved: true
        },
        {
          where: { id: userId },
        }
      );
    } catch (error) {
      Logger.error(
        `Failed to approve user. Reason = ${getErrorMessage(error)}`,
      );

      throw error;
    }
  }
}

export default CreatorService;
