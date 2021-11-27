import {
  ReviewRequestDTO,
  ReviewResponseDTO,
} from "../../interfaces/IReviewService";
import ReviewService from "../ReviewService";
import testReviews from "../../interfaces/samples/reviewRequest";
import testResponse from "../../interfaces/samples/reviewResponse";

describe("pg reviewService", () => {
  let reviewService: ReviewService;

  beforeAll(() => {
    reviewService = new ReviewService();
  });

  it("post reviews", async () => {
    const results: ReviewResponseDTO[] = await Promise.all(
      testReviews.map(async (review: ReviewRequestDTO) => {
        const response = await reviewService.createReview(review);
        return response;
      }),
    );

    results.forEach((result, i) => {
      expect(result.body).toEqual(testResponse[i].body);
      expect(result.books).toEqual(testResponse[i].books);
      expect(result.byline).toEqual(testResponse[i].byline);
      expect(result.coverImages).toEqual(testResponse[i].coverImages);
      expect(result.featured).toEqual(testResponse[i].featured);
      expect(result.tags).toEqual(testResponse[i].tags);
      /*
       * @TODO: uncomment when christine changes are merged
       * expect(result.created_by).toEqual(testReviews[i].createdBy);
       */
      expect(result.publishedAt).toEqual(testReviews[i].publishedAt);
    });
  });
});
