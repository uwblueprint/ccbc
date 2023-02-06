import { Creator } from "../types/CreatorTypes";
import { getBearerToken } from "../utils/AuthUtils";
import baseAPIClient from "./BaseAPIClient";

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
  createCreator,
  updateCreator,
};
