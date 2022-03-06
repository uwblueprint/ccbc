import { BEARER_TOKEN } from "../constants/AuthConstants";
import { ReviewResponse } from "../types/ReviewTypes";
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
 *
 * @returns {Promise<ReviewResponse[]>}
 */
const publishReview = async (reviewBody: any): Promise<ReviewResponse[]> => {
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

export default { getReviews, publishReview };
