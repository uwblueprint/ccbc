import { Router } from "express";
import { isAuthorizedByRole } from "../middlewares/auth";
import { sendErrorResponse } from "../utilities/errorResponse";
import { creatorUpdateDtoValidator } from "../middlewares/validators/creatorValidators";
import CreatorService from "../services/implementations/creatorService";
import ICreatorService from "../services/interfaces/creatorService";

const creatorRouter: Router = Router();
const creatorService: ICreatorService = new CreatorService();
creatorRouter.get("/");

interface CreatorReqQuery {
  id?: string;
  location?: string;
  ageRange?: string;
  genre?: string[];
  status?: string;
  province?: string;
}

creatorRouter.get(
  "/",
  isAuthorizedByRole(new Set(["Admin", "Subscriber", "Author"])),
  async (req, res) => {
    const { id, location, ageRange, genre, status, province } =
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
            province,
          }),
        );
      } catch (error: unknown) {
        sendErrorResponse(error, res);
      }
    }
  },
);

/* Approve users to be creators by id */
creatorRouter.put(
  "/approve/:id",
  isAuthorizedByRole(new Set(["Admin"])),
  async (req, res) => {
    const { id } = req.params;

    try {
      await creatorService.approveCreator(id);

      res.status(200).json({ message: "approved" });
    } catch (e: unknown) {
      sendErrorResponse(e, res);
    }
  },
);

/* Create creator by id in database */
creatorRouter.post(
  "/",
  isAuthorizedByRole(new Set(["Admin", "Subscriber", "Author"])),
  async (req, res) => {
    try {
      if (req.body.isApproved) throw new Error("invalid creator");
      // Only allow creation without any data
      const result = await creatorService.createCreator(req.body.userId);

      res.status(200).json(result);
    } catch (e: unknown) {
      sendErrorResponse(e, res);
    }
  },
);

/* Update creator in the database */
creatorRouter.put(
  "/:id",
  isAuthorizedByRole(new Set(["Admin", "Subscriber", "Author"])),
  creatorUpdateDtoValidator,
  async (req, res) => {
    try {
      if (req.body.isApproved) throw new Error("invalid creator");
      const { id } = req.params;
      const creator = await creatorService.updateCreator(
        parseInt(id, 10),
        req.body,
      );
      res.status(200).json(creator);
    } catch (e: unknown) {
      sendErrorResponse(e, res);
    }
  },
);

export default creatorRouter;
