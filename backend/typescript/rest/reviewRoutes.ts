import { Router } from "express";
import ReviewService from "../services/implementations/ReviewService";
import { IReviewService } from "../services/interfaces/IReviewService";

const reviewRouter: Router = Router();
const reviewService: IReviewService = new ReviewService();

reviewRouter.post("/", async (req, res) => {
  try {
    const body = JSON.parse(req.body.body);
    const newReview = await reviewService.createReview({
      body: body.body,
      coverImages: body.coverImages,
      byline: body.byline,
      featured: body.featured,
      createdBy: body.createdBy,
      books: body.books,
      tags: body.tags,
      publishedAt: body.publishedAt,
    });
    res.status(201).json(newReview);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

export default reviewRouter;
