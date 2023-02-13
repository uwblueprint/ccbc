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
  if (!validatePrimitive(req.body.rate, "number")) {
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
  // Calder W: New types
  if (!validatePrimitive(req.body.first_name, "string")) {
    return res.status(400).send(getApiValidationError("first_name", "string"));
  }
  if (!validatePrimitive(req.body.last_name, "string")) {
    return res.status(400).send(getApiValidationError("last_name", "string"));
  }
  if (!validatePrimitive(req.body.email, "string")) {
    return res.status(400).send(getApiValidationError("email", "string"));
  }
  if (!validatePrimitive(req.body.phone, "string")) {
    return res.status(400).send(getApiValidationError("phone", "string"));
  }
  if (!validatePrimitive(req.body.street_address, "string")) {
    return res
      .status(400)
      .send(getApiValidationError("street_address", "string"));
  }
  if (!validatePrimitive(req.body.city, "string")) {
    return res.status(400).send(getApiValidationError("city", "string"));
  }
  if (!validatePrimitive(req.body.province, "string")) {
    return res.status(400).send(getApiValidationError("province", "string"));
  }
  if (!validatePrimitive(req.body.postal_code, "string")) {
    return res.status(400).send(getApiValidationError("postal_code", "string"));
  }
  if (!validatePrimitive(req.body.craft, "string")) {
    return res.status(400).send(getApiValidationError("craft", "string"));
  }
  if (!validatePrimitive(req.body.website, "string")) {
    return res.status(400).send(getApiValidationError("website", "string"));
  }
  if (!validatePrimitive(req.body.profile_picture_link, "string")) {
    return res
      .status(400)
      .send(getApiValidationError("profile_picture_link", "string"));
  }
  if (!validatePrimitive(req.body.availability, "string")) {
    return res
      .status(400)
      .send(getApiValidationError("availability", "string"));
  }
  // TODO: How to do arrays?
  // if (!validatePrimitive(req.body.book_covers, "string")) {
  //   return res.status(400).send(getApiValidationError("book_covers", "string"));
  // }
  if (!validatePrimitive(req.body.isReadyForReview, "boolean")) {
    return res
      .status(400)
      .send(getApiValidationError("isReadyForReview", "boolean"));
  }
  // TODO: How to validate the presentations and publications?

  return next();
};

export const creatorUpdateDtoValidator = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  if (!validatePrimitive(req.body.userId, "integer")) {
    return res.status(400).send(getApiValidationError("userId", "integer"));
  }
  if (!validatePrimitive(req.body.location, "string")) {
    return res.status(400).send(getApiValidationError("location", "string"));
  }
  if (!validatePrimitive(req.body.genre, "string")) {
    return res.status(400).send(getApiValidationError("genre", "string"));
  }
  // temporarily commenting this out, somewhere in the backend the type for rate is an integer
  // if (!validatePrimitive(req.body.rate, "float")) {
  //   return res.status(400).send(getApiValidationError("rate", "number"));
  // }
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
  // Calder W: New types
  if (!validatePrimitive(req.body.first_name, "string")) {
    return res.status(400).send(getApiValidationError("first_name", "string"));
  }
  if (!validatePrimitive(req.body.last_name, "string")) {
    return res.status(400).send(getApiValidationError("last_name", "string"));
  }
  if (!validatePrimitive(req.body.email, "string")) {
    return res.status(400).send(getApiValidationError("email", "string"));
  }
  if (!validatePrimitive(req.body.phone, "string")) {
    return res.status(400).send(getApiValidationError("phone", "string"));
  }
  if (!validatePrimitive(req.body.street_address, "string")) {
    return res
      .status(400)
      .send(getApiValidationError("street_address", "string"));
  }
  if (!validatePrimitive(req.body.city, "string")) {
    return res.status(400).send(getApiValidationError("city", "string"));
  }
  if (!validatePrimitive(req.body.province, "string")) {
    return res.status(400).send(getApiValidationError("province", "string"));
  }
  if (!validatePrimitive(req.body.postal_code, "string")) {
    return res.status(400).send(getApiValidationError("postal_code", "string"));
  }
  if (!validatePrimitive(req.body.craft, "string")) {
    return res.status(400).send(getApiValidationError("craft", "string"));
  }
  if (!validatePrimitive(req.body.website, "string")) {
    return res.status(400).send(getApiValidationError("website", "string"));
  }
  if (!validatePrimitive(req.body.profile_picture_link, "string")) {
    return res
      .status(400)
      .send(getApiValidationError("profile_picture_link", "string"));
  }
  if (!validatePrimitive(req.body.availability, "string")) {
    return res
      .status(400)
      .send(getApiValidationError("availability", "string"));
  }
  // TODO: How to do arrays?
  // if (!validatePrimitive(req.body.book_covers, "string")) {
  //   return res.status(400).send(getApiValidationError("book_covers", "string"));
  // }
  if (!validatePrimitive(req.body.isReadyForReview, "boolean")) {
    return res
      .status(400)
      .send(getApiValidationError("isReadyForReview", "boolean"));
  }
  // TODO: How to validate the presentations and publications?

  return next();
};
