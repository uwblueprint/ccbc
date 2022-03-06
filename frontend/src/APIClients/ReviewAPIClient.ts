import { BEARER_TOKEN } from "../constants/AuthConstants";
import { ReviewRequest, ReviewResponse } from "../types/ReviewTypes";
import baseAPIClient from "./BaseAPIClient";

/*
  Get all reviews
*/
const getReviews = async (): Promise<ReviewResponse[]> => {
  try {
    const { data } = await baseAPIClient.get("/reviews", {
      headers: { Authorization: BEARER_TOKEN },
    });
    return data;
  } catch (error: unknown) {
    return error as ReviewResponse[];
  }
};

/*
  Delete review by id
*/
const deleteReviewById = async (id: string): Promise<ReviewResponse> => {
  try {
    const { data } = await baseAPIClient.delete(`/reviews/${id.toString()}`, {
      headers: { Authorization: BEARER_TOKEN },
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
    headers: { Authorization: BEARER_TOKEN },
  });
  return data;
};

/**
 *
 * @returns {Promise<ReviewResponse[]>}
 */
const publishReview = async (
  reviewBody: ReviewRequest,
): Promise<ReviewResponse[]> => {
  try {
    const { data } = await baseAPIClient.post("/", {
      data: reviewBody,
      headers: { Authorization: BEARER_TOKEN },
    });
    return data;
  } catch (error: unknown) {
    return error as ReviewResponse[];
  }
};

export default { getReviews, deleteReviewById, getReviewById, publishReview };
