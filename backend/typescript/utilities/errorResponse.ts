import { Response } from "express";

const getErrorMessage = (error: unknown): string => {
  return error instanceof Error
    ? error.message
    : "Error: Caught error of invalid type ";
};

const sendErrorResponse = async (
  error: unknown,
  res: Response,
): Promise<Response> => {
  return res.status(500).json({ error: getErrorMessage(error) });
};

export { sendErrorResponse, getErrorMessage };
