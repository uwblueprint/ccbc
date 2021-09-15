import { Response } from "express";
import { Readable } from "stream";
import { generateCSV } from "./CSVUtils";

/* eslint-disable-next-line import/prefer-default-export */
export const sendResponseByMimeType = async <T>(
  res: Response,
  responseCode: number,
  contentType: string | undefined,
  rawData: Readonly<T> | ReadonlyArray<T> | Readable,
): Promise<Response> => {
  if (contentType === "text/csv") {
    const csvText = await generateCSV<T>({ data: rawData });
    return res.status(responseCode).type("text/csv").send(csvText);
  }
  if (contentType === "application/json" || contentType === undefined) {
    return res.status(responseCode).json(rawData);
  }
  return res.status(415).json(rawData);
};
