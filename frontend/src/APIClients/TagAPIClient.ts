import { BEARER_TOKEN } from "../constants/AuthConstants";
import { TagResponse } from "../types/TagTypes";
import baseAPIClient from "./BaseAPIClient";

type TagDTO = {
  id: string;
  name: string;
};

const getTags = async (): Promise<TagResponse[]> => {
  try {
    // const { data } = await baseAPIClient.get("/tags", {
    //   headers: { Authorization: BEARER_TOKEN },
    // });
    // const tagOptions: TagResponse[] = [];
    // if (data && data.length) {
    //   data.forEach((tag: TagDTO) => {
    //     tagOptions.push({
    //       value: tag.id,
    //       label: tag.name,
    //     });
    //   });
    // }
    const tagOptions = [
      { value: "1", label: "pink" },
      { value: "2", label: "blue" },
      { value: "3", label: "red" },
      { value: "4", label: "green" },
    ];
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
