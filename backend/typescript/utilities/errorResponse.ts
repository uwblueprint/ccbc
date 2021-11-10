import { Response } from "express";

const sendErrorResponse = async (
  error: unknown,
  res: Response,
): Promise<Response> => {
  const errorMessage =
    error instanceof Error
      ? error.message
      : "Error: Caught error of invalid type ";
  return res.status(500).json({ error: errorMessage });
};

export default sendErrorResponse;
