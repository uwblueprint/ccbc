import { Option, Tag } from "../types/BookTypes";
import { getBearerToken } from "../utils/AuthUtils";
import baseAPIClient from "./BaseAPIClient";

const getTagOptions = async (): Promise<Option[]> => {
  try {
    const { data } = await baseAPIClient.get("/tags", {
      headers: { Authorization: getBearerToken() },
    });

    const options: Option[] = [];
    data.forEach((genre: Tag) => {
      options.push({
        value: genre.name,
        label: genre.name,
      });
    });

    return options;
  } catch (error: unknown) {
    return error as Option[];
  }
};

export default { getTagOptions };
