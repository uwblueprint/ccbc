export type GenreDTO = {
  name: string;
};
export interface IGenreService {
  /**
   * retrieve all existing tags
   * @param
   * @returns returns array of Tags
   * @throws Error if retrieval fails
   */
  getGenres(): Promise<GenreDTO[]>;
}
