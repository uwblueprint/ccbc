import { cloneDeep } from "lodash";
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
    const getReviewsResult: ReviewResponseDTO[] =
      await reviewService.getReviews();
    expect(getReviewsResult.length).toEqual(testReviews.length);

    // Sort actual and expected responses to make sure they are in the same order
    getReviewsResult.sort((a, b) => a.body.localeCompare(b.body));
    const testResponseCopy = [...testResponse].sort((a, b) =>
      a.body.localeCompare(b.body),
    );
    getReviewsResult.forEach((result) => {
      result.books.sort((a, b) => a.title.localeCompare(b.title));
      result.tags.sort((a, b) => a.name.localeCompare(b.name));
    });
    testResponseCopy.forEach((result) => {
      result.books.sort((a, b) => a.title.localeCompare(b.title));
      result.tags.sort((a, b) => a.name.localeCompare(b.name));
    });

    getReviewsResult.forEach((result, i) => {
      expect(result.body).toEqual(testResponseCopy[i].body);
      expect(result.books).toEqual(testResponseCopy[i].books);
      expect(result.byline).toEqual(testResponseCopy[i].byline);
      expect(result.featured).toEqual(testResponseCopy[i].featured);
      expect(result.tags).toEqual(testResponseCopy[i].tags);
      /*
       * @TODO: uncomment when christine changes are merged
       * expect(result.created_by).toEqual(testReviews[i].createdBy);
       */
      expect(result.publishedAt).toEqual(testReviews[i].publishedAt);
    });
  });

  it("get individual review", async () => {
    const getReviewsResult: ReviewResponseDTO[] =
      await reviewService.getReviews();

    getReviewsResult.forEach(async (result, i) => {
      const getReviewResult: ReviewResponseDTO = await reviewService.getReview(
        getReviewsResult[i].reviewId.toString(),
      );
      expect(getReviewResult.reviewId).toEqual(getReviewsResult[i].reviewId);
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

  it("updates individual review", async () => {
    // get all review in DB
    const reviews: ReviewResponseDTO[] = await reviewService.getReviews();
    expect(reviews.length).toBeGreaterThan(0);

    // get a random review to update
    const min = Math.ceil(0);
    const max = Math.floor(reviews.length - 1);
    const reviewIndex = Math.floor(Math.random() * (max - min) + min);
    const { reviewId } = reviews[reviewIndex];

    // get review before update
    const oldReview = reviews[reviewIndex];

    // update fields in review
    const updatedReview: ReviewRequestDTO = cloneDeep(
      oldReview,
    ) as ReviewRequestDTO;

    updatedReview.body = "updated body";
    updatedReview.featured = !oldReview.featured;

    // update review in DB
    await reviewService.updateReviews(reviewId, updatedReview);

    // get review from DB
    const updatedReviewDB = await reviewService.getReview(reviewId.toString());

    // sort review field wherever possible to be able to compare them
    oldReview.books.sort((a, b) => a.title.localeCompare(b.title));
    oldReview.tags.sort((a, b) => a.name.localeCompare(b.name));
    updatedReview.books.sort((a, b) => a.title.localeCompare(b.title));
    updatedReview.tags.sort((a, b) => a.name.localeCompare(b.name));
    updatedReviewDB.books.sort((a, b) => a.title.localeCompare(b.title));
    updatedReviewDB.tags.sort((a, b) => a.name.localeCompare(b.name));

    // check if fields match
    expect(updatedReviewDB.body).toEqual(updatedReview.body);
    expect(updatedReviewDB.featured).toEqual(updatedReview.featured);
    expect(updatedReviewDB.tags).toEqual(oldReview.tags);
    expect(updatedReviewDB.books).toEqual(oldReview.books);
    expect(updatedReviewDB.byline).toEqual(oldReview.byline);
    expect(updatedReviewDB.createdAt).toEqual(oldReview.createdAt);
    /*
     * @TODO: uncomment when christine changes are merged
     * expect(updatedReviewDB.created_by).toEqual(oldReview.createdBy);
     */
  });
});
