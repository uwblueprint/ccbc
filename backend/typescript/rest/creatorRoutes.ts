import { Router } from "express";
import { isAuthorizedByRole } from "../middlewares/auth";
import CreatorService from "../services/implementations/creatorService";
import ICreatorService from "../services/interfaces/creatorService";
import { sendErrorResponse } from "../utilities/errorResponse";

const creatorRouter: Router = Router();
creatorRouter.get("/");

interface CreatorReqQuery {
  id?: string;
  location?: string;
  ageRange?: string;
  genre?: string;
  status?: string;
}

const creatorService: ICreatorService = new CreatorService();

creatorRouter.get(
  "/",
  isAuthorizedByRole(new Set(["Admin", "Subscriber", "Author"])),
  async (req, res) => {
    const { id, location, ageRange, genre, status } =
      req.query as CreatorReqQuery;
    if (id) {
      const idNumeric = parseInt(id, 10);
      // Get User By Id
      if (Number.isNaN(idNumeric)) {
        res.status(400).json({ error: "id query parameter must be a number." });
      } else {
        try {
          res.status(200).json(await creatorService.getCreatorById(id));
        } catch (error: unknown) {
          sendErrorResponse(error, res);
        }
      }
    } else {
      // Get all creators with filter
      try {
        res.status(200).json(
          await creatorService.getCreators({
            status,
            genre,
            location,
            ageRange,
          }),
        );
      } catch (error: unknown) {
        sendErrorResponse(error, res);
      }
    }
  },
);

export default creatorRouter;
