import { Router } from "express";
import { creatorDtoValidator } from "../middlewares/validators/creatorValidators";

const creatorRouter: Router = Router();
creatorRouter.get("/");

creatorRouter.get("/", creatorDtoValidator, async (req, res) => {
  res.status(200).send("hello creator");
});

export default creatorRouter;
