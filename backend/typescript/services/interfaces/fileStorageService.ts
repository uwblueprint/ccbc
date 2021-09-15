interface IFileStorageService {
  /**
   * Retrieves file
   * @param fileName name of file
   * @param expirationTimeMinutes expiration time in minutes for generated URL
   * @returns Signed URL to file
   * @throws Error if file is not retrieved
   */
  getFile(fileName: string, expirationTimeMinutes?: number): Promise<string>;

  /**
   * Creates file
   * @param fileName name of file
   * @param filePath path of file
   * @param contentType MIME type of file
   * @throws Error if name of file already exists
   * @throws Error if file is not uploaded
   */
  createFile(
    fileName: string,
    filePath: string,
    contentType?: string | null,
  ): Promise<void>;

  /**
   * Updates file
   * @param fileName name of file
   * @param filePath path to file
   * @param contentType MIME type of file
   * @throws Error if name of file does not exist
   * @throws Error if file is not updated
   */
  updateFile(
    fileName: string,
    filePath: string,
    contentType?: string | null,
  ): Promise<void>;

  /**
   * Deletes file
   * @param fileName name of file
   * @throws Error if name of file does not exist
   * @throws Error if file is not deleted
   */
  deleteFile(fileName: string): Promise<void>;
}

export default IFileStorageService;
