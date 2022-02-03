import { Console } from "console";
import { NextFunction, Request, Response } from "express";

import AuthService from "../services/implementations/authService";
import UserService from "../services/implementations/userService";
import IAuthService from "../services/interfaces/authService";
import { Role } from "../types";

const authService: IAuthService = new AuthService(new UserService());

export const getAccessToken = (req: Request): string | null => {
  const authHeaderParts = req.headers.authorization?.split(" ");
  if (
    authHeaderParts &&
    authHeaderParts.length >= 2 &&
    authHeaderParts[0].toLowerCase() === "bearer"
  ) {
    return authHeaderParts[1];
  }
  return null;
};

/* Determine if request is authorized based on accessToken validity and role of client */
export const isAuthorizedByRole = (roles: Set<Role>) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    const accessToken = getAccessToken(req);
    const authorized =
      accessToken && (await authService.isAuthorizedByRole(accessToken, roles));
    if (!authorized) {
      return res
        .status(401)
        .json({ error: "You are not authorized to make this request." });
    }
    return next();
  };
};

/* Determine if request for a user-specific resource is authorized based on accessToken
 * validity and if the userId that the token was issued to matches the requested userId
 */
export const isAuthorizedByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction,
  userId: string,
): Promise<Response<unknown, Record<string, unknown>> | void> => {
  const accessToken = getAccessToken(req);
  const authorized =
    accessToken &&
    (await authService.isAuthorizedByUserId(accessToken, userId));
  if (!authorized) {
    return res
      .status(401)
      .json({ error: "You are not authorized to make this request." });
  }
  return next();
};

/* Determine if request for a user-specific resource is authorized based on accessToken
 * validity and if the email that the token was issued to matches the requested email
 * Note: emailField is the name of the request parameter containing the requested email */
export const isAuthorizedByEmail = (emailField: string) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    const accessToken = getAccessToken(req);
    const authorized =
      accessToken &&
      (await authService.isAuthorizedByEmail(
        accessToken,
        req.params[emailField],
      ));
    if (!authorized) {
      return res
        .status(401)
        .json({ error: "You are not authorized to make this request." });
    }
    return next();
  };
};

/**
 * isAuthorizedByUserIdFromBody verifies that the userId passed in the request
 * body matches with the logged in user
 *
 * @param userIdField - the name of the userId field in the request body
 */
export const isAuthorizedByUserIdFromBody = (userIdField: string) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    const userId = String(req.body[userIdField]);
    return isAuthorizedByUserId(req, res, next, userId);
  };
};

/**
 * isAuthorizedByUserIdFromBody verifies that the userId passed in the query
 * parameter matches with the logged in user
 *
 * @param userIdField - the name of the userId field in the query parameter
 */
export const isAuthorizedByUserIdFromQuery = (userIdField: string) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    const userId = req.params[userIdField];
    return isAuthorizedByUserId(req, res, next, userId);
  };
};
