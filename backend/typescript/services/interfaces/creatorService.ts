import { CreatorDTO, CreatorCreateUpdateDTO } from "../../types";

interface ICreatorService {
  /**
   * Get creator associated with id
   * @param id creator's id
   * @param isUserId true indicates search for user id instead of creator id
   * @returns a CreatorDTO with creator's information
   * @throws Error if creator retrieval fails
   */
  getCreatorById(userId: string, isUserId?: boolean): Promise<CreatorDTO>;

  /**
   * Get all creator information (possibly paginated in the future)
   * @returns array of CreatorDTOs
   * @throws Error if creator retrieval fails
   */
  getCreators({
    status,
    genres,
    location,
    ageRange,
    provinces,
    crafts,
    searchText,
  }: {
    status?: string;
    genres?: string[];
    location?: string;
    ageRange?: string;
    provinces?: string[];
    crafts?: string[];
    searchText?: string;
  }): Promise<Array<CreatorDTO>>;
  /**
   * Approves a user to be a creator on the platform
   * @param userId The id of the user we want to make an approved creator.
   */
  approveCreator(userId: string): Promise<void>;

  /**
   * Rejects a user to be a creator on the platform
   * @param userId The id of the user we want to reject.
   */
  rejectCreator(userId: string): Promise<void>;

  /**
   * Create new creator in databse
   * @param userId The id of the user we want to delete.
   * @returns void
   * @throws Error if deleting a creator fails
   */
  deleteCreator(userId: string): Promise<void>;

  /**
   * Create new creator in databse
   * @param userId the userId of the creator
   * @returns New creator
   * @throws Error if creating a creator fails
   */
  createCreator(userId: number): Promise<CreatorDTO>;

  /**
   * Update creator with the given id, return updated creator
   * @param id Creator's id
   * @param creator updated creator object
   * @returns Updated creator
   * @throws Error if updating a creator fails
   */
  updateCreator(
    id: number,
    creator: CreatorCreateUpdateDTO,
  ): Promise<CreatorDTO>;

  /**
   * Sends a link to the creator profile setup page to the creator with the given email
   * @param email email of creator that will be setting up their profile
   * @throws Error if unable to send email
   */
  sendCreatorProfileSetupLink(email: string): Promise<void>;
}

export default ICreatorService;
