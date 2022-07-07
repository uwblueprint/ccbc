import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
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
// pass a set of admin and any other role that will not need subscriptions in the future
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
    // user cannot be null, since this would be catched by isAuthorizedByRole
    const user: User | null = await authService.getUserByAccessToken(
      accessToken,
    );
    if (user == null) {
      return res.status(404).json({ error: "No user was found." });
    }
    if (
      !roles.has(user.role_type) &&
      user.subscription_expires_on != null &&
      user.role_type !== "Admin"
    ) {
      const currentDate = new Date();
      currentDate.setUTCHours(0, 0, 0, 0);
      const subscriptionExpireDate = new Date(user.subscription_expires_on);
      subscriptionExpireDate.setUTCHours(0, 0, 0, 0);

      if (currentDate.getTime() > subscriptionExpireDate.getTime()) {
        return res
          .status(401)
          .json({ error: "You are not authorized to make this request." });
      }
    }
    return next();
  };
};

/* Determine if request for a user-specific resource is authorized based on accessToken and user id
 * validity and if the userId that the token was issued to matches the requested userId
 */
export const isAuthorizedByUserId = (userIdField: string) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    const accessToken = getAccessToken(req);
    const userId = req.params[userIdField] || String(req.body[userIdField]);
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
