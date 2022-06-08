import { ReviewRequest, ReviewResponse } from "../types/ReviewTypes";
import { getBearerToken } from "../utils/AuthUtils";
import baseAPIClient from "./BaseAPIClient";

/*
  Get all reviews
*/
const getReviews = async (): Promise<ReviewResponse[]> => {
  try {
    const { data } = await baseAPIClient.get("/reviews", {
      headers: { Authorization: getBearerToken() },
    });
    return data;
  } catch (error: unknown) {
    return error as ReviewResponse[];
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
  try {
    const { data } = await baseAPIClient.delete(`/reviews/${id.toString()}`, {
      headers: { Authorization: getBearerToken() },
    });
    return data;
  } catch (error) {
    return error as ReviewResponse;
  }
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
