import { Request, Response, NextFunction } from "express";
import { getApiValidationError, validatePrimitive } from "./util";

export const creatorDtoValidator = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  if (!validatePrimitive(req.body.id, "integer")) {
    return res.status(400).send(getApiValidationError("id", "integer"));
  }
  if (!validatePrimitive(req.body.userId, "integer")) {
    return res.status(400).send(getApiValidationError("userId", "integer"));
  }
  if (!validatePrimitive(req.body.location, "string")) {
    return res.status(400).send(getApiValidationError("location", "string"));
  }
  if (!validatePrimitive(req.body.genre, "string")) {
    return res.status(400).send(getApiValidationError("genre", "string"));
  }
  if (!validatePrimitive(req.body.rate, "float")) {
    return res.status(400).send(getApiValidationError("rate", "float"));
  }
  if (!validatePrimitive(req.body.ageRange, "string")) {
    return res.status(400).send(getApiValidationError("ageRange", "string"));
  }
  if (!validatePrimitive(req.body.timezone, "string")) {
    return res.status(400).send(getApiValidationError("timezone", "string"));
  }
  if (!validatePrimitive(req.body.bio, "string")) {
    return res.status(400).send(getApiValidationError("bio", "string"));
  }
  if (!validatePrimitive(req.body.isApproved, "boolean")) {
    return res.status(400).send(getApiValidationError("isApproved", "boolean"));
  }

  return next();
};

export const creatorCreateUpdateDtoValidator = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  if (!validatePrimitive(req.body.id, "integer")) {
    return res.status(400).send(getApiValidationError("id", "integer"));
  }
  if (!validatePrimitive(req.body.userId, "integer")) {
    return res.status(400).send(getApiValidationError("userId", "integer"));
  }
  if (!validatePrimitive(req.body.location, "string")) {
    return res.status(400).send(getApiValidationError("location", "string"));
  }
  if (!validatePrimitive(req.body.genre, "string")) {
    return res.status(400).send(getApiValidationError("genre", "string"));
  }
  if (!validatePrimitive(req.body.rate, "float")) {
    return res.status(400).send(getApiValidationError("rate", "float"));
  }
  if (!validatePrimitive(req.body.ageRange, "string")) {
    return res.status(400).send(getApiValidationError("ageRange", "string"));
  }
  if (!validatePrimitive(req.body.timezone, "string")) {
    return res.status(400).send(getApiValidationError("timezone", "string"));
  }
  if (!validatePrimitive(req.body.bio, "string")) {
    return res.status(400).send(getApiValidationError("bio", "string"));
  }
  if (req.body.isApproved) {
    return res.status(400).send("The isApproved is not undefined");
  }

  return next();
};
