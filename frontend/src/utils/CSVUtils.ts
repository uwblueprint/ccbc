import { parseAsync, transforms } from "json2csv";
import { Readable, TransformOptions } from "stream";

type GenerateCSVParams<T> = {
  data: Readonly<T> | ReadonlyArray<T> | Readable;
  fields?: string[];
  transformFunction?: (item: T) => Record<string, unknown>;
  flattenObjects?: boolean;
  flattenArrays?: boolean;
  pathsToUnwind?: string[];
  opts?: json2csv.Options<T>;
  transformOpts?: TransformOptions;
};

/**
 * Generate a CSV from a JSON array/object or readable input stream.
 * fields, transformFunction, flattenObjects, flattenArrays, and pathsToUnwind belong to json2csv.options but
 * they are also provided as parameters here for convenience.
 * For examples using each of these params, see the CSVUtils.test.ts file.
 * @param data JSON array/object or stream to convert to a CSV string
 * @param fields columns to include in the csv
 * @param transformFunction function to transform fields of the object before converting to csv
 * @param flattenObjects indicates whether each property of object fields should be split into a different column
 * @param flattenArrays indicates whether each element of array fields should be split into a different column
 * @param pathsToUnwind array fields that should be split into different rows
 * @param opts options from json2csv to override or add additional options (https://mircozeiss.com/json2csv/#available-options)
 * @param transformOpts transform options from stream module (https://nodejs.org/api/stream.html#stream_new_stream_transform_options)
 * @returns CSV string
 * @throws Error if JSON is not parsed properly
 */
/* eslint-disable-next-line import/prefer-default-export */
export const generateCSV = async <T>({
  data,
  fields,
  transformFunction,
  flattenObjects = false,
  flattenArrays = false,
  pathsToUnwind,
  opts,
  transformOpts,
}: GenerateCSVParams<T>): Promise<string> => {
  const transformations = [
    transforms.flatten({
      objects: flattenObjects,
      arrays: flattenArrays,
    }),
  ];
  if (transformFunction) {
    transformations.push(transformFunction);
  }
  if (pathsToUnwind) {
    transformations.push(transforms.unwind({ paths: pathsToUnwind }));
  }

  const options = {
    fields,
    transforms: transformations,
    ...opts,
  };
  return parseAsync<T>(data, options, transformOpts);
};

/**
 * Downloads a CSV file.
 * References: https://github.com/mui-org/material-ui-x/blob/fa346f0fbe3d9b9eea9bb403fe4675f544d6abf9/packages/grid/_modules_/grid/utils/exportAs.ts
 * @param data CSV string
 * @param fileName name of the CSV file
 */
export const downloadCSV = (data: string, fileName: string): void => {
  const byteOrderMark = "\uFEFF";
  const csvContent = byteOrderMark + data;
  const blob = new Blob([csvContent], {
    type: "text/csv, charset=UTF-8",
  });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  setTimeout(() => {
    URL.revokeObjectURL(url);
  });
};
