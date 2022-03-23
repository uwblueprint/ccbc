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
 * @returns "sucess" if publishing was successfull
 */
const publishEditeReview = async (
  id: number,
  review: ReviewRequest,
): Promise<"success" | null> => {
  try {
    await baseAPIClient.put(`/reviews/${id}`, review, {
      headers: {
        Authorization: BEARER_TOKEN,
        "Content-Type": "application/json",
      },
    });
    return "success";
  } catch (error: unknown) {
    return null;
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
  publishEditeReview,
  deleteReviewById,
  getReviewById,
};
