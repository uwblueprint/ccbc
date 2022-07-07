import { Genre, Option } from "../types/BookTypes";
import { getBearerToken } from "../utils/AuthUtils";
import baseAPIClient from "./BaseAPIClient";

const getGenreOptions = async (): Promise<Option[]> => {
  try {
    const { data } = await baseAPIClient.get("/genres", {
      headers: { Authorization: getBearerToken() },
    });

    const options: Option[] = [];
    data.forEach((genre: Genre) => {
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

export default { getGenreOptions };
