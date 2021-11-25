import { TagDTO } from "../../types";

export interface ITagService {
  /**
   * retrieve all existing tags
   * @param
   * @returns returns array of Tags
   * @throws Error if retrieval fails
   */
   getTags(): Promise<TagDTO[]>;
}

export default ITagService;
