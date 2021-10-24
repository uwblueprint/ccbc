import { Request, Response, NextFunction } from "express";
import { getApiValidationError, validatePrimitive } from "./util";

export const loginRequestValidator = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  if (req.body.idToken) {
    if (!validatePrimitive(req.body.idToken, "string")) {
      return res.status(400).json(getApiValidationError("idToken", "string"));
    }
  } else {
    if (!validatePrimitive(req.body.email, "string")) {
      return res.status(400).send(getApiValidationError("email", "string"));
    }
    if (!validatePrimitive(req.body.password, "string")) {
      return res.status(400).send(getApiValidationError("password", "string"));
    }
  }
  return next();
};

export const registerRequestValidator = async (
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
  if (!validatePrimitive(req.body.password, "string")) {
    return res.status(400).send(getApiValidationError("password", "string"));
  }

  return next();
};
