import { Creator } from "../types/CreatorProfileTypes";
import { getBearerToken } from "../utils/AuthUtils";
import baseAPIClient from "./BaseAPIClient";

/**
 * Get all creators
 */
const getCreators = async (): Promise<Array<Creator>> => {
  try {
    const { data } = await baseAPIClient.get("/creators", {
      headers: { Authorization: getBearerToken() },
    });
    return data;
  } catch (error: unknown) {
    return error as Array<Creator>;
  }
};

/**
 * Approve a creator by ID
 */
const approveCreator = async (id: number): Promise<void> => {
  await baseAPIClient.put(
    `/creators/approve/${id.toString()}`,
    {},
    {
      headers: {
        Authorization: getBearerToken(),
        "Content-Type": "application/json",
      },
    },
  );
};

/**
 * Delete a creator by ID
 */
const deleteCreator = async (id: number): Promise<void> => {
  await baseAPIClient.delete(`/creators/delete/${id.toString()}`, {
    headers: {
      Authorization: getBearerToken(),
      "Content-Type": "application/json",
    },
  });
};

export default {
  getCreators,
  approveCreator,
  deleteCreator,
};
