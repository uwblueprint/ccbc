import { BEARER_TOKEN } from "../constants/AuthConstants";
import { TagResponse } from "../types/TagTypes";
import baseAPIClient from "./BaseAPIClient";

const getTags = async (): Promise<TagResponse[]> => {
  try {
    const { data } = await baseAPIClient.get("/tags", {
      headers: { Authorization: BEARER_TOKEN },
    });
    const tagOptions: TagResponse[] = [];
    if (data && data.length) {
      data.forEach((tag) => {
        tagOptions.push({
          value: tag.id,
          label: tag.name,
        });
      });
    }
    return tagOptions;
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
