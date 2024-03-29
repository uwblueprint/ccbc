import { Request, Response, NextFunction } from "express";
import { getApiValidationError, validatePrimitive } from "./util";

export const createUserDtoValidator = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  if (!validatePrimitive(req.body.email, "string")) {
    return res.status(400).send(getApiValidationError("email", "string"));
  }
  if (
    req.body.roleType !== "Admin" &&
    req.body.roleType !== "Subscriber" &&
    req.body.roleType !== "Author"
  ) {
    return res.status(400).send(getApiValidationError("roleType", "Role"));
  }

  return next();
};

export const updateUserDtoValidator = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  if (!validatePrimitive(req.body.firstName, "string")) {
    return res.status(400).send(getApiValidationError("firstName", "string"));
  }
  if (!validatePrimitive(req.body.lastName, "string")) {
    return res.status(400).send(getApiValidationError("lastName", "string"));
  }
  if (!validatePrimitive(req.body.email, "string")) {
    return res.status(400).send(getApiValidationError("email", "string"));
  }
  if (
    req.body.roleType !== "Admin" &&
    req.body.roleType !== "Subscriber" &&
    req.body.roleType !== "Author"
  ) {
    return res.status(400).send(getApiValidationError("roleType", "Role"));
  }
  if (!validatePrimitive(req.body.active, "boolean")) {
    return res.status(400).send(getApiValidationError("active", "boolean"));
  }
  return next();
};
