import Genre from "../../models/tag.model";
import { IGenreService } from "../interfaces/IGenreService";
import logger from "../../utilities/logger";
import { getErrorMessage } from "../../utilities/errorResponse";
import { GenreDTO } from "../../types";

const Logger = logger(__filename);

class GenreService implements IGenreService {
  /* eslint-disable class-methods-use-this */
  async getGenres(): Promise<GenreDTO[]> {
    try {
      const genres: Genre[] = await Genre.findAll();

      return genres.map((genre) => ({
        name: genre.name,
      }));
    } catch (error: unknown) {
      Logger.error(
        `Failed to get genres due to error: ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }
}

export default GenreService;
