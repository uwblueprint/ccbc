import { TagDTO } from "../../types";

export interface ITagService {
  /**
   * retrieve all existing tags
   * @param
   * @returns returns array of Tags
   * @throws Error if retrieval fails
   */
  getTags(): Promise<TagDTO[]>;

  /**
   * delete the tag with the given id
   * @param tagId tag id
   * @throws Error if deletion fails
   */
  deleteTag(id: string): Promise<String>;
}
