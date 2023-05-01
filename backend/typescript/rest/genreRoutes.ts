import { Router } from "express";
import sendResponseByMimeType from "../utilities/responseUtil";
import GenreService from "../services/implementations/genreService";
import { IGenreService } from "../services/interfaces/IGenreService";
import { getErrorMessage } from "../utilities/errorResponse";
import { isAuthorizedByRole } from "../middlewares/auth";

const genreRouter: Router = Router();
const genreService: IGenreService = new GenreService();

genreRouter.get(
  "/",
  async (req, res) => {
    const contentType = req.headers["content-type"];
    try {
      const genres = await genreService.getGenres();
      await sendResponseByMimeType(res, 200, contentType, genres);
    } catch (e: unknown) {
      await sendResponseByMimeType(res, 500, contentType, [
        {
          error: getErrorMessage(e),
        },
      ]);
    }
  },
);

export default genreRouter;
