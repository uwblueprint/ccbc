import { Router } from "express";
import CreatorBookingService from "../services/implementations/creatorBookingService";
import {
  CreatorBookingResponseDTO,
  ICreatorBookingService,
} from "../services/interfaces/ICreatorBookingService";
import { sendErrorResponse } from "../utilities/errorResponse";
import sendResponseByMimeType from "../utilities/responseUtil";

const creatorBookingRouter: Router = Router();
const creatorBookingService: ICreatorBookingService =
  new CreatorBookingService();

creatorBookingRouter.post("/:id", async (req, res) => {
  const contentType = req.headers["content-type"];
  try {
    const { id } = req.params;
    const newBooking = await creatorBookingService.addCreatorBooking({
      creatorId: parseInt(id, 10),
      name: req.body.name,
      email: req.body.email,
      date: req.body.date,
      isTentative: req.body.isTentative,
      isOneDay: req.body.isOneDay,
      ageGroup: req.body.ageGroup,
      audienceSize: req.body.audienceSize,
      subject: req.body.subject,
      message: req.body.message,
    });
    await sendResponseByMimeType<CreatorBookingResponseDTO>(
      res,
      200,
      contentType,
      newBooking,
    );
  } catch (e: unknown) {
    sendErrorResponse(e, res);
  }
});

export default creatorBookingRouter;
