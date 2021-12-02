import Tag from "../../models/tag.model";
import { ITagService } from "../interfaces/ITagService";
import logger from "../../utilities/logger";
import { getErrorMessage } from "../../utilities/errorResponse";
import { TagDTO } from "../../types";

const Logger = logger(__filename);

class TagService implements ITagService {
  async getTags(): Promise<TagDTO[]> {
    try {
      const tags: Array<Tag> = await Tag.findAll();

      return tags.map((tag) => ({
        id: tag.id,
        name: tag.name,
      }));
    } catch (error) {
      Logger.error(
        `Failed to get tags due to error: ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }

  async deleteTag(id: string): Promise<void> {
    try {
      const tagToDelete = await Tag.findByPk(id, { raw: true });
      const deleteResult: number | null = await Tag.destroy({ where: { id } });

      if (!tagToDelete || !deleteResult) {
        throw Error(`Tag id ${id} not found`);
      }
    } catch (error) {
      Logger.error(`Failed to delete tag: ${getErrorMessage(error)}`);
      throw error;
    }
  }
}

export default TagService;
