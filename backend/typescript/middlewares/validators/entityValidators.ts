import { Request, Response, NextFunction } from "express";
import {
  getApiValidationError,
  getFileTypeValidationError,
  validateArray,
  validateFileType,
  validatePrimitive,
} from "./util";

/* eslint-disable-next-line import/prefer-default-export */
export const entityRequestDtoValidator = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let body;
  try {
    body = JSON.parse(req.body.body);
  } catch (e) {
    return res.status(400).send(e.message);
  }
  if (!validatePrimitive(body.stringField, "string")) {
    return res.status(400).send(getApiValidationError("stringField", "string"));
  }
  if (!validatePrimitive(body.intField, "integer")) {
    return res.status(400).send(getApiValidationError("intField", "integer"));
  }
  if (!validatePrimitive(body.enumField, "string")) {
    return res.status(400).send(getApiValidationError("enumField", "string"));
  }
  if (!validateArray(body.stringArrayField, "string")) {
    return res
      .status(400)
      .send(getApiValidationError("stringArrayField", "string", true));
  }
  if (!validatePrimitive(body.boolField, "boolean")) {
    return res.status(400).send(getApiValidationError("boolField", "boolean"));
  }
  if (req.file && !validateFileType(req.file.mimetype)) {
    return res.status(400).send(getFileTypeValidationError(req.file.mimetype));
  }
  return next();
};
