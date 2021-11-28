import { Request, Response, NextFunction } from "express";
import { getApiValidationError, validatePrimitive } from "./util";

const createTagValidator = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  if (!validatePrimitive(req.body.name, "string")) {
    return res.status(400).send(getApiValidationError("name", "string"));
  }
  return next();
};

export default createTagValidator;
