import { Request, Response, NextFunction } from "express";
import {
  validatePrimitive,
  validateArray,
  getApiValidationError,
} from "./util";

const reviewRequestDtoValidator = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  let body;
  try {
    body = JSON.parse(req.body.body);
  } catch (e) {
    return res.status(400).send(e.message);
  }
  if (!validatePrimitive(body.body, "string")) {
    return res.status(400).send(getApiValidationError("body", "string"));
  }
  if (!validateArray(body.coverImages, "string")) {
    return res
      .status(400)
      .send(getApiValidationError("coverImages", "string", true));
  }
  if (!validatePrimitive(body.byline, "string")) {
    return res.status(400).send(getApiValidationError("byline", "string"));
  }
  if (!validatePrimitive(body.featured, "boolean")) {
    return res.status(400).send(getApiValidationError("featured", "boolean"));
  }

  return next();
};

export default reviewRequestDtoValidator;
