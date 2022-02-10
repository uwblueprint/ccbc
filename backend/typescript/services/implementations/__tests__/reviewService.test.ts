import { cloneDeep, isEqual } from "lodash";
import { request } from "http";
import {
  AuthorRequest,
  AuthorResponse,
  BookRequest,
  BookResponse,
  PublisherRequest,
  PublisherResponse,
  ReviewRequestDTO,
  ReviewResponseDTO,
  TagRequest,
  TagResponse,
} from "../../interfaces/IReviewService";
import ReviewService from "../reviewService";
import testReviews from "../../interfaces/samples/reviewRequest";
import testResponse from "../../interfaces/samples/reviewResponse";
import testSql from "../../../testUtils/testDb";

function reviewsAreEqual(
  reviewA: ReviewRequestDTO | ReviewResponseDTO,
  reviewB: ReviewResponseDTO | ReviewResponseDTO,
) {
  expect(reviewA.body).toEqual(reviewB.body);
  expect(reviewA.byline).toEqual(reviewB.byline);
  expect(reviewA.featured).toEqual(reviewB.featured);
  expect(reviewA.publishedAt).toEqual(reviewB.publishedAt);
  /*
   * @TODO: uncomment when christine changes are merged
   * expect(result.created_by).toEqual(testReviews[i].createdBy);
   */

  reviewA.tags.sort((a, b) => a.name.localeCompare(b.name));
  reviewB.tags.sort((a, b) => a.name.localeCompare(b.name));
  reviewA.tags.forEach((rATag: TagRequest | TagResponse, rATagIndex) => {
    expect(rATag.name).toEqual(reviewB.tags[rATagIndex].name);
  });

  reviewA.books.sort((a, b) => a.title.localeCompare(b.title));
  reviewB.books.sort((a, b) => a.title.localeCompare(b.title));

  reviewA.books.forEach((rABook: BookRequest | BookResponse, rABookIndex) => {
    const reviewBBook = reviewB.books[rABookIndex];
    expect(rABook.coverImage).toEqual(reviewBBook.coverImage);
    expect(rABook.formats).toEqual(reviewBBook.formats);
    if (rABook.illustrator)
      expect(rABook.illustrator).toEqual(reviewBBook.illustrator);
    expect(rABook.maxAge).toEqual(reviewBBook.maxAge);
    expect(rABook.minAge).toEqual(reviewBBook.minAge);
    if (rABook.series.name)
      expect(rABook.series.name).toEqual(reviewBBook.series.name);
    if (rABook.seriesOrder)
      expect(rABook.seriesOrder).toEqual(reviewBBook.seriesOrder);
    expect(rABook.title).toEqual(reviewBBook.title);
    if (rABook.titlePrefix)
      expect(rABook.titlePrefix).toEqual(reviewBBook.titlePrefix);
    if (rABook.translator)
      expect(rABook.translator).toEqual(reviewBBook.translator);

    const rBAuthors = reviewBBook.authors;
    rABook.authors.sort((a, b) => a.fullName.localeCompare(b.fullName));
    rBAuthors.sort((a, b) => a.fullName.localeCompare(b.fullName));
    rABook.authors.forEach(
      (rAAuthor: AuthorRequest | AuthorResponse, rAAuthorIndex) => {
        const reviewBAuthor = rBAuthors[rAAuthorIndex];
        if (rAAuthor.attribution)
          expect(rAAuthor.attribution).toEqual(reviewBAuthor.attribution);
        if (rAAuthor.attribution)
          expect(rAAuthor.displayName).toEqual(reviewBAuthor.displayName);
        expect(rAAuthor.fullName).toEqual(reviewBAuthor.fullName);
      },
    );

    const rBPublishers = reviewBBook.publishers;
    rABook.publishers.sort((a, b) => a.fullName.localeCompare(b.fullName));
    rBPublishers.sort((a, b) => a.fullName.localeCompare(b.fullName));
    rABook.publishers.forEach(
      (rAPublisher: PublisherRequest | PublisherResponse, rAPublisherIndex) => {
        const rBPublisher = rBPublishers[rAPublisherIndex];
        expect(rAPublisher.publishYear).toEqual(rBPublisher.publishYear);
        expect(rAPublisher.fullName).toEqual(rBPublisher.fullName);
      },
    );
  });
}

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

    testReviews.sort((a, b) => a.body.localeCompare(b.body));
    results.sort((a, b) => a.body.localeCompare(b.body));

    for (let i = 0; i < testReviews.length; i += 1) {
      reviewsAreEqual(testReviews[i], results[i]);
    }
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
      reviewsAreEqual(result, testResponseCopy[i]);
    });
  });

  it("get individual review", async () => {
    const getReviewsResult: ReviewResponseDTO[] =
      await reviewService.getReviews();

    getReviewsResult.forEach(async (result, i) => {
      const getReviewResult: ReviewResponseDTO = await reviewService.getReview(
        getReviewsResult[i].reviewId.toString(),
      );
      reviewsAreEqual(getReviewResult, testResponse[i]);
    });
  });

  it("delete review by id", async () => {
    // Get original reviews in DB
    const oldResult: ReviewResponseDTO[] = await reviewService.getReviews();

    const deletedId = oldResult[0].reviewId;
    // Use the 'body' field to identify reviews for these tests, since we do
    // not know which review was assigned to which ID in the DB
    const deletedBodyVal = oldResult[0].body;

    // Delete a review
    await reviewService.deleteReview(deletedId.toString());
    await expect(reviewService.getReview(deletedId.toString())).rejects.toThrow(
      `Review id ${deletedId} not found`,
    );

    // Get updated list of reviews in DB
    const newResult: ReviewResponseDTO[] = await reviewService.getReviews();
    expect(newResult.length).toEqual(oldResult.length - 1);

    // Sort actual and expected responses to make sure they are in the same order
    newResult.sort((a, b) => a.body.localeCompare(b.body));
    const testResponseCopy = [...testResponse].sort((a, b) =>
      a.body.localeCompare(b.body),
    );
    newResult.forEach((result) => {
      result.books.sort((a, b) => a.title.localeCompare(b.title));
      result.tags.sort((a, b) => a.name.localeCompare(b.name));
    });

    // Ensure all other undeleted reviews are unchanged
    testResponseCopy.forEach((response, i) => {
      // Delete response corresponding to the review we just deleted
      if (response.body === deletedBodyVal) {
        testResponseCopy.splice(i, 1);
      } else {
        response.books.sort((a, b) => a.title.localeCompare(b.title));
        response.tags.sort((a, b) => a.name.localeCompare(b.name));

        newResult[i].books.sort((a, b) => a.title.localeCompare(b.title));
        newResult[i].tags.sort((a, b) => a.name.localeCompare(b.name));

        reviewsAreEqual(newResult[i], response);
      }
    });
  });
});
