import { Router } from "express";
import { isAuthorizedByRole } from "../middlewares/auth";
import { sendErrorResponse } from "../utilities/errorResponse";
import { creatorDtoValidator } from "../middlewares/validators/creatorValidators";
import CreatorService from "../services/implementations/creatorService";
import ICreatorService from "../services/interfaces/creatorService";

const creatorService: ICreatorService = new CreatorService();

const creatorRouter: Router = Router();
creatorRouter.get("/");

creatorRouter.get("/", creatorDtoValidator, async (req, res) => {
  res.status(200).send("hello creator");
});

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

export default creatorRouter;
