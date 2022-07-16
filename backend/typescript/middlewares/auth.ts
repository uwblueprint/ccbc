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

/* Determine if the origin of the respose is a valid origin to based on the request headers.
If invalid theywill not be able to use the endpoint
allowedOrigins is the list of all the origins that are allowed to use an endpoint. 
*/
export const isValidOriginOfRequest = (allowedOrigins: string[]) => {
  const whitelistedOrigins = Array.isArray(allowedOrigins)
    ? allowedOrigins
    : [allowedOrigins];
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    const origin = req.headers.origin;
    if (whitelistedOrigins.indexOf(origin) > -1) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    } else {
      res.status(403).json({
        msg: "This is a private Endpoint, Please contact the Admin",
      });
    }
    return next();
  };
};
