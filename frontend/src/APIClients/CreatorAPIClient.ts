import { Creator } from "../types/CreatorTypes";
import { getBearerToken } from "../utils/AuthUtils";
import baseAPIClient from "./BaseAPIClient";

const createCreator = async (id: number): Promise<Creator> => {
  const newCreator: Creator = {
    userId: id,
  };
  try {
    const { data } = await baseAPIClient.post("/", newCreator, {
      headers: {
        Authorization: getBearerToken(),
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    return null;
  }
};

const updateCreator = async (
  userId: number,
  creator: Creator,
): Promise<Creator> => {
  try {
    const { data } = await baseAPIClient.put(`/creators/${userId}`, creator, {
      headers: {
        Authorization: getBearerToken(),
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    return null;
  }
};

export default {
  createCreator,
  updateCreator,
};
