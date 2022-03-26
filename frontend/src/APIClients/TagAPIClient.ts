import { TagResponse } from "../types/TagTypes";
import { getBearerToken } from "../utils/AuthUtils";
import baseAPIClient from "./BaseAPIClient";

const getTags = async (): Promise<TagResponse[]> => {
  try {
    const { data } = await baseAPIClient.get("/tags", {
      headers: { Authorization: getBearerToken() },
    });

    // For testing comment out above and use below:
    // const data = [
    //   { id: "1", name: "pink" },
    //   { id: "2", name: "reed" },
    //   { id: "3", name: "red" },
    //   { id: "4", name: "green" },
    // ];

    return data;
  } catch (error) {
    return error as TagResponse[];
  }
};

const deleteTagById = async (id: string): Promise<TagResponse> => {
  try {
    const { data } = await baseAPIClient.delete(`/tags/${id.toString()}`, {
      headers: { Authorization: getBearerToken() },
    });
    return data;
  } catch (error) {
    return error as TagResponse;
  }
};

export default { getTags, deleteTagById };
