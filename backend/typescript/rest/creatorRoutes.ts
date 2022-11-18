import { Router } from "express";
import { isAuthorizedByRole } from "../middlewares/auth";
import CreatorService from "../services/implementations/creatorService";
import ICreatorService from "../services/interfaces/creatorService";
import { sendErrorResponse } from "../utilities/errorResponse";

const creatorRouter: Router = Router();
creatorRouter.get("/");

const creatorService: ICreatorService = new CreatorService();

function isOverlap(ageRange: string, ageRangeCmp: string): boolean {
  const lowerInclusiveBound = parseInt(
    ageRange.split(",")[0].slice(1) || "",
    10,
  );
  const upperExclusiveBound = parseInt(
    ageRange.split(",")[1].slice(0, -1) || "",
    10,
  );

  const lowerInclusiveBoundCmp = parseInt(
    ageRangeCmp?.split(",")[0].slice(1) || "",
    10,
  );
  const upperExclusiveBoundCmp = parseInt(
    ageRangeCmp?.split(",")[1].slice(0, -1) || "",
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
    const { id, location, ageRange, genre, status } = req.query;
    const isAdmin = !isAuthorizedByRole(new Set(["Admin"]));
    if (id) {
      if (typeof id === "string") {
        const idNumeric = parseInt(id, 10);
        // Get User By Id
        if (Number.isNaN(idNumeric)) {
          res
            .status(400)
            .json({ error: "id query parameter must be a number." });
        } else {
          try {
            const creator = await creatorService.getCreatorById(id);
            if (isAdmin && creator.isApproved === false) {
              res.status(404).json({ error: "No creator was found." });
            } else {
              res.status(200).json(creator);
            }
          } catch (error: unknown) {
            sendErrorResponse(error, res);
          }
        }
      } else {
        res.status(400).json({ error: "id query parameter must be a number." });
      }
    } else {
      // Get all creators with filter
      try {
        if (location && typeof location !== "string") {
          res
            .status(400)
            .json({ error: "location query parameter must be a string." });
          return;
        }

        if (ageRange && typeof ageRange !== "string") {
          res.status(400).json({
            error:
              "age query parameter must be a string in interval form [x, y).",
          });
          return;
        }
        if (genre && typeof genre !== "string") {
          res
            .status(400)
            .json({ error: "id query parameter must be a string." });
          return;
        }
        if (status !== undefined && status !== "true" && status !== "false") {
          res
            .status(400)
            .json({ error: "status query parameter must be a boolean." });
          return;
        }
        const creators = await creatorService.getCreators();

        const filteredCreators = creators.filter(
          (creator) =>
            (creator.isApproved || isAdmin) &&
            (!status || creator.isApproved === (status === "true")) &&
            (!genre || creator.genre.toLowerCase() === genre.toLowerCase()) &&
            (!location ||
              creator.location.toLowerCase() === location.toLowerCase()) &&
            (!ageRange || isOverlap(creator.ageRange, ageRange)),
        );
        res.status(200).json(filteredCreators);
      } catch (error: unknown) {
        sendErrorResponse(error, res);
      }
    }
  },
);

export default creatorRouter;
