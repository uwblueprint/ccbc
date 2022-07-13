import Tag from "../../models/tag.model";
import { ITagService } from "../interfaces/ITagService";
import logger from "../../utilities/logger";
import { getErrorMessage } from "../../utilities/errorResponse";
import { TagDTO } from "../../types";

const Logger = logger(__filename);

class TagService implements ITagService {
  /* eslint-disable class-methods-use-this */
  async getTags(): Promise<TagDTO[]> {
    try {
      const tags: Tag[] = await Tag.findAll();

      return tags.map((tag) => ({
        name: tag.name,
      }));
    } catch (error: unknown) {
      Logger.error(
        `Failed to get tags due to error: ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }

  /* eslint-disable class-methods-use-this */
  async deleteTag(name: string): Promise<string> {
    try {
      const tagToDelete = await Tag.findByPk(name, { raw: true });
      const deleteResult: number | null = await Tag.destroy({
        where: { name },
      });

      if (!tagToDelete || !deleteResult) {
        throw Error(`Tag name ${name} not found`);
      }
      return name;
    } catch (error: unknown) {
      Logger.error(`Failed to delete tag: ${getErrorMessage(error)}`);
      throw error;
    }
  }
}

export default TagService;
