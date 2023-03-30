import { Creator, CreatorBookingRequest } from "../types/CreatorTypes";
import { getBearerToken } from "../utils/AuthUtils";
import baseAPIClient from "./BaseAPIClient";

/**
 * Get all creators
 */
const getCreators = async (
  status?: string,
  searchText?: string,
  genres?: string[],
  provinces?: string[],
  crafts?: string[],
  gradeLevel?: string
): Promise<Array<Creator>> => {
  const params = new URLSearchParams();
  if (status) params.append("status", status);
  if (searchText) params.append("searchText", searchText);
  if (genres) params.append("genres", String(genres));
  if (provinces) params.append("provinces", String(provinces));
  if (crafts) params.append("crafts", String(crafts));
  if (gradeLevel) params.append("ageRange", String(gradeLevel));

  try {
    const { data } = await baseAPIClient.get("/creators", {
      headers: { Authorization: getBearerToken() },
      params,
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
  isReadyForReview: boolean,
  creator: Creator,
): Promise<Creator> => {
  const newCreator: Creator = {
    ...creator,
    isReadyForReview,
  };
  const formattedCreator = Object.fromEntries(
    Object.entries(newCreator).filter(([_, v]) => v != null),
  );

  try {
    const { data } = await baseAPIClient.put(
      `/creators/${id}`,
      formattedCreator,
      {
        headers: {
          Authorization: getBearerToken(),
          "Content-Type": "application/json",
        },
      },
    );
    return data;
  } catch (error) {
    throw new Error(`Update creator failed`);
  }
};

const addCreatorBooking = async (
  creatorBooking: CreatorBookingRequest,
): Promise<void> => {
  try {
    await baseAPIClient.post(
      `/booking/${creatorBooking.creatorId}`,
      creatorBooking,
      {
        headers: {
          Authorization: getBearerToken(),
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    throw new Error("Add creator booking request failed");
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

/**
 * This function obtains a creator given a unique identifer
 *
 * @param id - the unique identifier of the creator to obtain
 * @returns Promise<ReviewResponse>
 */

const getCreatorByUserId = async (id: string): Promise<Creator> => {
  const requestRoute = `/creators/user/${id}`;
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
  addCreatorBooking,
  getCreatorById,
  getCreatorByUserId,
};
