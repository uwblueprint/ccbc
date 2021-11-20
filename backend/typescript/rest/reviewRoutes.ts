import { Router, json } from "express";
import ReviewService from "../services/implementations/ReviewService";
import {
  IReviewService,
  Tag,
  Book,
} from "../services/interfaces/IReviewService";
import { sendErrorResponse } from "../utilities/errorResponse";
import reviewRequestDtoValidator from "../middlewares/validators/reviewValidators";

const reviewRouter: Router = Router();
const reviewService: IReviewService = new ReviewService();

reviewRouter.post("/", reviewRequestDtoValidator, async (req, res) => {
  try {
    const newReview = await reviewService.createReview({
      body: req.body.body,
      coverImages: req.body.coverImages,
      byline: req.body.byline,
      featured: req.body.featured,
      createdBy: req.body.createdBy,
      books: req.body.books as Book[],
      tags: req.body.tags as Tag[],
      publishedAt: req.body.publishedAt,
    });
    res.status(201).json(newReview);
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

export default reviewRouter;
