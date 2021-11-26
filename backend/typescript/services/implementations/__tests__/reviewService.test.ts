import { ReviewResponseDTO } from "../../interfaces/IReviewService";
import ReviewService from "../ReviewService";
import testReviews from "./sampleReviews";

describe("pg reviewService", () => {
  let reviewService: ReviewService;

  beforeAll(() => {
    reviewService = new ReviewService();
  });

  it("post reviews", async () => {
    const results: ReviewResponseDTO[] = await Promise.all(
      testReviews.map(async (review) => {
        const response = await reviewService.createReview(review);
        return response;
      }),
    );

    results.forEach((result, i) => {
      expect(result.body).toEqual(testReviews[i].body);
      expect(result.books).toEqual(testReviews[i].books);
      expect(result.byline).toEqual(testReviews[i].byline);
      expect(result.cover_images).toEqual(testReviews[i].coverImages);
      expect(result.featured).toEqual(testReviews[i].featured);
      expect(result.tags).toEqual(testReviews[i].tags);
      /*
       * @TODO: uncomment when christine changes are merged
       * expect(result.created_by).toEqual(testReviews[i].createdBy);
       */
      expect(result.publishedAt).toEqual(testReviews[i].publishedAt);
    });
  });
});
