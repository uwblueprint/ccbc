import { Router } from "express";
import ReviewService from "../services/implementations/reviewService";
import {
  IReviewService,
  Tag,
  BookRequest,
  ReviewResponseDTO,
} from "../services/interfaces/IReviewService";
import { sendErrorResponse } from "../utilities/errorResponse";
import reviewRequestDtoValidator from "../middlewares/validators/reviewValidators";
import sendResponseByMimeType from "../utilities/responseUtil";

const reviewRouter: Router = Router();
const reviewService: IReviewService = new ReviewService();

reviewRouter.post("/", reviewRequestDtoValidator, async (req, res) => {
  const contentType = req.headers["content-type"];
  try {
    const newReview = await reviewService.createReview({
      body: req.body.body,
      byline: req.body.byline,
      featured: req.body.featured,
      /*
       *@TODO: uncomment when christine changes are merged
       *createdBy: req.body.createdBy,
       */
      books: req.body.books as BookRequest[],
      tags: req.body.tags as Tag[],
      publishedAt: req.body.publishedAt,
    });
    await sendResponseByMimeType<ReviewResponseDTO>(
      res,
      200,
      contentType,
      newReview,
    );
  } catch (e: unknown) {
    sendErrorResponse(e, res);
  }
});

export default reviewRouter;
