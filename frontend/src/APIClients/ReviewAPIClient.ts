import { BEARER_TOKEN } from "../constants/AuthConstants";
import { ReviewResponse } from "../types/ReviewTypes";
import baseAPIClient from "./BaseAPIClient";

const getReviews = async (): Promise<ReviewResponse[]> => {
  try {
    const { data } = await baseAPIClient.get("/reviews", {
      headers: { Authorization: BEARER_TOKEN },
    });
    return data;
  } catch (error) {
    return error as ReviewResponse[];
  }
};

export default getReviews;
