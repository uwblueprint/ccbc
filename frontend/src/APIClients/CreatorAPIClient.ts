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

const createCreator = async (id: number): Promise<Creator> => {
  const newCreator: Creator = {
    userId: id,
  };
  try {
    const { data } = await baseAPIClient.post("/creators", newCreator, {
      headers: {
        Authorization: getBearerToken(),
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    throw new Error(`Create creator failed`);
  }
};

const updateCreator = async (
  id: number,
  creator: Creator,
): Promise<Creator> => {
  try {
    const { data } = await baseAPIClient.put(`/creators/${id}`, creator, {
      headers: {
        Authorization: getBearerToken(),
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    throw new Error(`Update creator failed`);
  }
};

export default {
  getCreators,
  approveCreator,
  deleteCreator,
};
