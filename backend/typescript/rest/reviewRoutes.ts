import { Router, json } from "express";
import ReviewService from "../services/implementations/ReviewService";
import {
  IReviewService,
  Tag,
  Book,
} from "../services/interfaces/IReviewService";

const reviewRouter: Router = Router();
const reviewService: IReviewService = new ReviewService();

reviewRouter.post("/", async (req, res) => {
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
  } catch (e) {
    res.status(500).send(e.message);
  }
});

export default reviewRouter;
