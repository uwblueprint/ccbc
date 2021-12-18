import { BEARER_TOKEN } from "../constants/AuthConstants";
import { TagResponse } from "../types/TagTypes";
import baseAPIClient from "./BaseAPIClient";

const getTags = async (): Promise<TagResponse[]> => {
  try {
    const { data } = await baseAPIClient.get("/tags", {
      headers: { Authorization: BEARER_TOKEN },
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
      headers: { Authorization: BEARER_TOKEN },
    });
    return data;
  } catch (error) {
    return error as TagResponse;
  }
};

export default { getTags, deleteTagById };
