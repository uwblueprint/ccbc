import {
  ReviewRequestDTO,
  ReviewResponseDTO,
} from "../../interfaces/IReviewService";
import ReviewService from "../reviewService";
import testReviews from "../../interfaces/samples/reviewRequest";
import testResponse from "../../interfaces/samples/reviewResponse";
import testSql from "../../../testUtils/testDb";

describe("pg reviewService", () => {
  let reviewService: ReviewService;

  beforeAll(async () => {
    await testSql.sync({ force: true });
    reviewService = new ReviewService(testSql);
  });
  afterAll(async () => {
    await testSql.sync({ force: true });
    await testSql.close();
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
      expect(result.featured).toEqual(testResponse[i].featured);
      expect(result.tags).toEqual(testResponse[i].tags);
      /*
       * @TODO: uncomment when christine changes are merged
       * expect(result.created_by).toEqual(testReviews[i].createdBy);
       */
      expect(result.publishedAt).toEqual(testReviews[i].publishedAt);
    });
  });

  it("get reviews", async () => {
    const createReviewResult: ReviewResponseDTO[] = await Promise.all(
      testReviews.map(async (review: ReviewRequestDTO) => {
        const response = await reviewService.createReview(review);
        return response;
      }),
    );

    const getReviewsResult: ReviewResponseDTO[] = await reviewService.getReviews();
    expect(getReviewsResult.length).toEqual(createReviewResult.length);

    getReviewsResult.forEach((result, i) => {
      expect(result.body).toEqual(testResponse[i].body);
      expect(result.books).toEqual(testResponse[i].books);
      expect(result.byline).toEqual(testResponse[i].byline);
      expect(result.featured).toEqual(testResponse[i].featured);
      expect(result.tags).toEqual(testResponse[i].tags);
      /*
       * @TODO: uncomment when christine changes are merged
       * expect(result.created_by).toEqual(testReviews[i].createdBy);
       */
      expect(result.publishedAt).toEqual(testReviews[i].publishedAt);
    });
  });

  it("get individual review", async () => {
    const createReviewResult: ReviewResponseDTO[] = await Promise.all(
      testReviews.map(async (review: ReviewRequestDTO) => {
        const response = await reviewService.createReview(review);
        return response;
      }),
    );

    const getReviewsResult: ReviewResponseDTO[] = await reviewService.getReviews();

    createReviewResult.forEach(async (result, i) => {
      const getReviewResult: ReviewResponseDTO = await reviewService.getReview(
        createReviewResult[i].reviewId.toString()
      );
      expect(getReviewResult.reviewId).toEqual(createReviewResult[i].reviewId);
      expect(getReviewResult.body).toEqual(testResponse[i].body);
      expect(getReviewResult.books).toEqual(testResponse[i].books);
      expect(getReviewResult.byline).toEqual(testResponse[i].byline);
      expect(getReviewResult.featured).toEqual(testResponse[i].featured);
      expect(getReviewResult.tags).toEqual(testResponse[i].tags);
      /*
       * @TODO: uncomment when christine changes are merged
       * expect(result.created_by).toEqual(testReviews[i].createdBy);
       */
      expect(getReviewResult.publishedAt).toEqual(testReviews[i].publishedAt);
    });
  });
});
