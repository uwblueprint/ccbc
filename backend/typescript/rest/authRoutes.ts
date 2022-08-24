import { Router } from "express";

import password from "secure-random-password";
import {
  isAuthorizedByEmail,
  isAuthorizedBySubscription,
  isAuthorizedByUserId,
} from "../middlewares/auth";
import {
  loginRequestValidator,
  registerRequestValidator,
} from "../middlewares/validators/authValidators";
import nodemailerConfig from "../nodemailer.config";
import AuthService from "../services/implementations/authService";
import EmailService from "../services/implementations/emailService";
import UserService from "../services/implementations/userService";
import IAuthService from "../services/interfaces/authService";
import IEmailService from "../services/interfaces/emailService";
import IUserService from "../services/interfaces/userService";
import { sendErrorResponse } from "../utilities/errorResponse";
import authDtoToToUserDto from "../utilities/authUtils";

const authRouter: Router = Router();
const userService: IUserService = new UserService();
const emailService: IEmailService = new EmailService(nodemailerConfig);
const authService: IAuthService = new AuthService(userService, emailService);

/* Returns access token and user info in response body and sets refreshToken as an httpOnly cookie */
authRouter.post(
  "/login",
  loginRequestValidator,
  isAuthorizedBySubscription,
  async (req, res) => {
    try {
      const authDTO = req.body.idToken
        ? // OAuth
          await authService.generateTokenOAuth(req.body.idToken)
        : await authService.generateToken(req.body.email, req.body.password);

      const { refreshToken, ...rest } = authDTO;

      res
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "none",
          secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json(rest);
    } catch (error: unknown) {
      sendErrorResponse(error, res);
    }
  },
);

/* returns a firebase user given a user id */
authRouter.get("/:uid", async (req, res) => {
  try {
    const firebaseUser = await authService.getFirebaseUserByUid(req.params.uid);
    res.status(200).json(firebaseUser);
  } catch (error: unknown) {
    sendErrorResponse(error, res);
  }
});

/* Register a user, returns access token and user info in response body and sets refreshToken as an httpOnly cookie */
authRouter.post("/register", registerRequestValidator, async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    const authDTO = await authService.createUserAndSendRegistrationEmail(
      firstName,
      lastName,
      email,
      "Admin",
      null,
    );

    res.status(200).json(authDtoToToUserDto(authDTO));
  } catch (error: unknown) {
    sendErrorResponse(error, res);
  }
});

/* Sends the user an email to reset their password. Used when the user has forgotten their password */
authRouter.post("/forgotPassword", async (req, res) => {
  try {
    // Find the user record with that email. If none found, error will be caught
    const firebaseUserUid = await authService.getFirebaseUserIdByEmail(
      req.body.email,
    );

    // Set the user's password to the random access code. This is needed on the front end to verify the user
    const accessCode = await authService.setTemporaryUserPassword(
      firebaseUserUid,
    );

    const currentUser = await userService.getUserByEmail(req.body.email);

    // Send email to user to reset their password
    await authService.sendPasswordSetupLink(currentUser, accessCode, false);

    res.status(200).json();
  } catch (error: unknown) {
    res.status(200).json();
  }
});

/* Returns access token in response body and sets refreshToken as an httpOnly cookie */
authRouter.post("/refresh", async (req, res) => {
  try {
    const token = await authService.renewToken(req.cookies.refreshToken);

    res
      .cookie("refreshToken", token.refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({ accessToken: token.accessToken });
  } catch (error: unknown) {
    sendErrorResponse(error, res);
  }
});

/* Revokes all of the specified user's refresh tokens */
authRouter.post(
  "/logout/:userId",
  isAuthorizedByUserId("userId"),
  async (req, res) => {
    try {
      await authService.revokeTokens(req.params.userId);
      res.status(204).send();
    } catch (error: unknown) {
      sendErrorResponse(error, res);
    }
  },
);

/* Emails a password reset link to the user with the specified email */
authRouter.post(
  "/resetPassword/:email",
  isAuthorizedByEmail("email"),
  async (req, res) => {
    try {
      await authService.resetPassword(req.params.email);
      res.status(204).send();
    } catch (error: unknown) {
      sendErrorResponse(error, res);
    }
  },
);

/* verifies a user by the given uid in the url */
authRouter.post("/verifyEmail/:uid", async (req, res) => {
  try {
    await authService.markVerified(req.params.uid);
    res.status(204).send();
  } catch (error: unknown) {
    sendErrorResponse(error, res);
  }
});

export default authRouter;
