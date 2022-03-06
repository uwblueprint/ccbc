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

/**
 * Publishes a review
 * @param review - The review to publish
 * @returns The published review
 */
const publishReview = async (
  review: ReviewRequest,
): Promise<ReviewResponse | null> => {
  try {
    const { data } = await baseAPIClient.post("/reviews", review, {
      headers: {
        Authorization: BEARER_TOKEN,
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error: unknown) {
    return null;
  }
};

export default { getReviews, publishReview };
