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

function isOverlap(ageRange: string, ageRangeCmp: string): boolean {
  const lowerInclusiveBound = parseInt(ageRange.split(",")[0].slice(1), 10);
  const upperExclusiveBound = parseInt(ageRange.split(",")[1].slice(0, -1), 10);

  const lowerInclusiveBoundCmp = parseInt(
    ageRangeCmp?.split(",")[0].slice(1),
    10,
  );
  const upperExclusiveBoundCmp = parseInt(
    ageRangeCmp?.split(",")[1].slice(0, -1),
    10,
  );

  return (
    Math.max(lowerInclusiveBound, lowerInclusiveBoundCmp) <=
    Math.min(upperExclusiveBound, upperExclusiveBoundCmp)
  );
}

creatorRouter.get(
  "/",
  isAuthorizedByRole(new Set(["Admin", "Subscriber", "Author"])),
  async (req, res) => {
    const { id, location, ageRange, genre, status } =
      req.query as CreatorReqQuery;
    const isAdmin = !isAuthorizedByRole(new Set(["Admin"]));
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
        const creators = await creatorService.getCreators();
        const filteredCreators = creators.filter(
          (creator) =>
            (creator.isApproved || isAdmin) &&
            (status ? creator.isApproved === (status === "true") : true) &&
            (genre
              ? creator.genre.toLowerCase() === genre.toLowerCase()
              : true) &&
            (location
              ? creator.location.toLowerCase() === location.toLowerCase()
              : true) &&
            (ageRange ? isOverlap(creator.ageRange, ageRange) : true),
        );
        res.status(200).json(filteredCreators);
      } catch (error: unknown) {
        sendErrorResponse(error, res);
      }
    }
  },
);

export default creatorRouter;
