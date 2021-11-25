import Tag from "../../models/tag.model";
import { ITagService } from "../interfaces/tagService";
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
};

export default TagService;
