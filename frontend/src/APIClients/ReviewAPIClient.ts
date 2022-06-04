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
 * @param review - The review to publish
 * @returns The published review
 */
const publishCreatedReview = async (
  review: ReviewRequest,
): Promise<ReviewResponse | null> => {
  try {
    const { data } = await baseAPIClient.post("/reviews", review, {
      headers: {
        Authorization: getBearerToken(),
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error: unknown) {
    return null;
  }
};

/**
 * Publishes an edited review
 * @param id - The id of the review to publish
 * @param review - The review to publish
 * @returns true if publishing was successfull, otherwise false
 */
const publishEditedReview = async (
  id: number,
  review: ReviewRequest,
): Promise<void> => {
  return await baseAPIClient.put(`/reviews/${id}`, review, {
    headers: {
      Authorization: getBearerToken(),
      "Content-Type": "application/json",
    },
  });
};

/**
 * Calls publishEditedReview if an id is passed otherwise calls publishCreatedReview
 * @param review  - Review to publish
 * @param id - Id of review
 * @returns - Created Review if it was created or a boolean describing if the review was edited successfully
 */
const handleReview = async (
  review: ReviewRequest,
  id?: number,
): Promise<ReviewResponse | null | boolean> => {
  if (id) {
    return publishEditedReview(id, review);
  }
  return publishCreatedReview(review);
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
