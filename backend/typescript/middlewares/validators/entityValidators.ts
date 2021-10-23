import { Request, Response, NextFunction } from "express";
import {
  getApiValidationError,
  getFileTypeValidationError,
  validateArray,
  validateFileType,
  validatePrimitive,
} from "./util";

<<<<<<< HEAD
/* eslint-disable-next-line import/prefer-default-export, @typescript-eslint/explicit-module-boundary-types */
export const entityRequestDtoValidator = async (
=======
const entityRequestDtoValidator = async (
>>>>>>> development
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

export default entityRequestDtoValidator;
