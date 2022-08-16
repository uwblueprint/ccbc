import {
  PaginatedReviewResponse,
  ReviewRequest,
  ReviewResponse,
} from "../types/ReviewTypes";
import { getBearerToken } from "../utils/AuthUtils";
import baseAPIClient from "./BaseAPIClient";

/**
 * Get all reviews with (optional) parameters
 * @param search? - the query string
 * @param size? - the number of returned reviews
 * @param page? - the current page of reviews to be fetched
 * @param minAge? - the minimum age for book audience (inclusive)
 * @param maxAge? - the  maximum age for book audience (inclusive)
 * @param featured? - whether the reviews are featured or not
 */
const getReviews = async (
  search?: string,
  size?: number,
  page?: number,
  minAge?: number,
  maxAge?: number,
  featured?: boolean,
): Promise<PaginatedReviewResponse> => {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (size || size === 0) params.append("size", String(size));
  if (page || page === 0) params.append("page", String(page));
  if (minAge || minAge === 0) params.append("minAge", String(minAge));
  if (maxAge || maxAge === 0) params.append("maxAge", String(maxAge));
  if (featured) params.append("featured", "featured");

  try {
    const { data } = await baseAPIClient.get("/reviews", {
      headers: { Authorization: getBearerToken() },
      params,
    });
    return data;
  } catch (error: unknown) {
    return error as PaginatedReviewResponse;
  }
};

/**
 * Publishes a created review
 * Needs to be wrapped in a try catch
 * @param review - The review to publish
 * @returns The published review, otherwise throws an error
 */
const publishCreatedReview = async (
  review: ReviewRequest,
): Promise<ReviewResponse> => {
  const { data } = await baseAPIClient.post("/reviews", review, {
    headers: {
      Authorization: getBearerToken(),
      "Content-Type": "application/json",
    },
  });
  return data;
};

/**
 * Publishes an edited review
 *  Needs to be wrapped in a try catch
 * @param id - The id of the review to publish
 * @param review - The review to publish
 * @returns nothing if successful, throws an error if not successful
 */
const publishEditedReview = async (
  id: number,
  review: ReviewRequest,
): Promise<void> => {
  await baseAPIClient.put(`/reviews/${id}`, review, {
    headers: {
      Authorization: getBearerToken(),
      "Content-Type": "application/json",
    },
  });
};

/**
 * Calls publishEditedReview if an id is passed otherwise calls publishCreatedReview
 * Needs to be wrapped in a try catch
 * @param review  - Review to publish
 * @param id - Id of review
 * Throws an error if not successfull
 */
const handleReview = async (
  review: ReviewRequest,
  id?: number,
): Promise<void | ReviewResponse> => {
  if (id) {
    await publishEditedReview(id, review);
  } else {
    await publishCreatedReview(review);
  }
};

/*
  Delete review by id
*/
const deleteReviewById = async (id: string): Promise<ReviewResponse> => {
  const { data } = await baseAPIClient.delete(`/reviews/${id.toString()}`, {
    headers: { Authorization: getBearerToken() },
  });
  return data;
};

/**
 * This function obtains a review given a unique identifer
 *
 * @param id - the unique identifier of the review to obtain
 * @returns Promise<ReviewResponse>
 */
const getReviewById = async (id: string): Promise<ReviewResponse> => {
  // TODO: catch error
  const requestRoute = `/reviews/${id}`;
  const { data } = await baseAPIClient.get(requestRoute, {
    headers: { Authorization: getBearerToken() },
  });
  return data;
};

export default {
  getReviews,
  publishCreatedReview,
  publishEditedReview,
  deleteReviewById,
  getReviewById,
  handleReview,
};
