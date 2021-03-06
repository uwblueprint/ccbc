import { Request, Response, NextFunction } from "express";
import { getErrorMessage } from "../../utilities/errorResponse";
import {
  getApiValidationError,
  getFileTypeValidationError,
  validateArray,
  validateFileType,
  validatePrimitive,
} from "./util";

const entityRequestDtoValidator = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  let body;
  try {
    body = JSON.parse(req.body.body);
  } catch (e: unknown) {
    return res.status(400).send(getErrorMessage(e));
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
