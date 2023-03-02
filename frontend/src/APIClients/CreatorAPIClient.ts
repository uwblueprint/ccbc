import { Creator } from "../types/CreatorTypes";
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
 * Reject a creator by ID
 */
const rejectCreator = async (id: number): Promise<void> => {
  await baseAPIClient.put(
    `/creators/reject/${id.toString()}`,
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

/**
 * This function obtains a creator given a unique identifer
 *
 * @param id - the unique identifier of the creator to obtain
 * @returns Promise<ReviewResponse>
 */

const getCreatorById = async (id: string): Promise<Creator> => {
  const requestRoute = `/creators/${id}`;
  const { data } = await baseAPIClient.get(requestRoute, {
    headers: { Authorization: getBearerToken() }, // this line is copied jwt token
  });
  return data;
};

export default {
  getCreators,
  approveCreator,
  rejectCreator,
  deleteCreator,
  createCreator,
  updateCreator,
  getCreatorById,
};
