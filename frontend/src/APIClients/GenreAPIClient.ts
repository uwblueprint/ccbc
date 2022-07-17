import { Genre, Option } from "../types/BookTypes";
import { getBearerToken } from "../utils/AuthUtils";
import baseAPIClient from "./BaseAPIClient";

const getGenreOptions = async (): Promise<Option[]> => {
  const { data } = await baseAPIClient.get("/genres", {
    headers: { Authorization: getBearerToken() },
  });

  if (!data) {
    throw new Error(`Genres not found.`);
  }

  const options: Option[] = [];
  data.forEach((genre: Genre) => {
    options.push({
      value: genre.name,
      label: genre.name,
    });
  });

  return options;
};

export default { getGenreOptions };
