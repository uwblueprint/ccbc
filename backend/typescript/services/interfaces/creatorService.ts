import { CreatorDTO } from "../../types";

interface ICreatorService {
  /**
   * Get creator associated with id
   * @param id creator's id
   * @returns a CreatorDTO with creator's information
   * @throws Error if creator retrieval fails
   */
  getCreatorById(userId: string): Promise<CreatorDTO>;

  /**
   * Get all creator information (possibly paginated in the future)
   * @returns array of CreatorDTOs
   * @throws Error if creator retrieval fails
   */
  getCreators(): Promise<Array<CreatorDTO>>;
}

export default ICreatorService;
