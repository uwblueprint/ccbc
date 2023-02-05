import { Router } from "express";
import { isAuthorizedByRole } from "../middlewares/auth";
import { sendErrorResponse } from "../utilities/errorResponse";
import { creatorDtoValidator } from "../middlewares/validators/creatorValidators";
import CreatorService from "../services/implementations/creatorService";
import ICreatorService from "../services/interfaces/creatorService";

const creatorRouter: Router = Router();
const creatorService: ICreatorService = new CreatorService();
creatorRouter.get("/");

interface CreatorReqQuery {
  id?: string;
  location?: string;
  ageRange?: string;
  genre?: string;
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

creatorRouter.post(
  "/",
  isAuthorizedByRole(new Set(["Admin", "Subscriber", "Author"])),
  creatorDtoValidator,
  async (req, res) => {
    try {
      if (req.body.isApproved) throw new Error("invalid creator");
      await creatorService.createCreator({
        id: req.body.id,
        userId: req.body.userId,
        location: req.body.location,
        rate: req.body.rate,
        genre: req.body.genre,
        ageRange: req.body.ageRange,
        timezone: req.body.timezone,
        bio: req.body.bio,
        // new fields
        firstName: req.body.firstName,
        lastName: req.body.firstName,
        email: req.body.email,
        phone: req.body.phone,
        streetAddress: req.body.streetAddress,
        city: req.body.city,
        province: req.body.province,
        postalCode: req.body.postalCode,
        craft: req.body.craft,
        website: req.body.website,
        profilePictureLink: req.body.profilePictureLink,
        availability: req.body.availability,
        bookCovers: req.body.bookCovers,
        isReadyForReview: req.body.isReadyForReview,
      });

      res.status(200).json({ message: "Created creator!" });
    } catch (e: unknown) {
      sendErrorResponse(e, res);
    }
  },
);

export default creatorRouter;
