import { Router } from "express";
import ReviewService from "../services/implementations/reviewService";
import {
  IReviewService,
  Tag,
  BookRequest,
  ReviewResponseDTO,
} from "../services/interfaces/IReviewService";
import { getErrorMessage, sendErrorResponse } from "../utilities/errorResponse";
import sendResponseByMimeType from "../utilities/responseUtil";
import reviewRequestDtoValidator from "../middlewares/validators/reviewValidators";

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

reviewRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const review = await reviewService.getReview(id);
    res.status(200).json(review);
  } catch (e: unknown) {
    sendErrorResponse(e, res);
  }
});

reviewRouter.get("/", async (req, res) => {
  const contentType = req.headers["content-type"];
  try {
    const reviews = await reviewService.getReviews();
    await sendResponseByMimeType<ReviewResponseDTO[]>(
      res,
      200,
      contentType,
      reviews,
    );
  } catch (e: unknown) {
    await sendResponseByMimeType(res, 500, contentType, [
      {
        error: getErrorMessage(e),
      },
    ]);
  }
});

reviewRouter.put("/:id", reviewRequestDtoValidator, async (req, res) => {
  try {
    const { id } = req.params;
    const review = await reviewService.updateReviews(id, req.body);
    res.status(200).json(review);
  } catch (e: unknown) {
    sendErrorResponse(e, res);
  }
});

reviewRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await reviewService.deleteReview(id);
    res.status(204).send();
  } catch (e: unknown) {
    sendErrorResponse(e, res);
  }
});

export default reviewRouter;
