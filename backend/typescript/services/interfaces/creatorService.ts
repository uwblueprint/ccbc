import { CreatorDTO, CreatorCreateUpdateDTO } from "../../types";

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
  getCreators({
    status,
    genre,
    location,
    ageRange,
  }: {
    status?: string;
    genre?: string;
    location?: string;
    ageRange?: string;
  }): Promise<Array<CreatorDTO>>;
  /**
   * Approves a user to be a creator on the platform
   * @param userId The id of the user we want to make an approved creator.
   */
  approveCreator(userId: string): Promise<void>;

  /**
   * Create new creator in databse
   * @param CreatorCreateUpdateDTO
   * @returns void
   * @throws Error if creating a creator fails
   */
  createCreator(userId: number): Promise<void>;

  /**
   * Update creator with the given id, return updated creator
   * @param userId Creator id
   * @param CreatorCreateUpdateDTO Updated creator
   * @returns Updated creator
   * @throws Error if updating a creator fails
   */
  updateCreator(
    userId: number,
    creator: CreatorCreateUpdateDTO,
  ): Promise<CreatorCreateUpdateDTO>;

  /**
   * Sends a link to the creator profile setup page to the creator with the given email
   * @param email email of creator that will be setting up their profile
   * @throws Error if unable to send email
   */
  sendCreatorProfileSetupLink(email: string): Promise<void>;
}

export default ICreatorService;
