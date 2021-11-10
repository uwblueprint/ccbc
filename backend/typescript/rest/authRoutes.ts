import { Router } from "express";

import password from "secure-random-password";
import { isAuthorizedByEmail, isAuthorizedByUserId } from "../middlewares/auth";
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

const authRouter: Router = Router();
const userService: IUserService = new UserService();
const emailService: IEmailService = new EmailService(nodemailerConfig);
const authService: IAuthService = new AuthService(userService, emailService);

/* Returns access token and user info in response body and sets refreshToken as an httpOnly cookie */
authRouter.post("/login", loginRequestValidator, async (req, res) => {
  try {
    const authDTO = req.body.idToken
      ? // OAuth
        await authService.generateTokenOAuth(req.body.idToken)
      : await authService.generateToken(req.body.email, req.body.password);

    const { refreshToken, ...rest } = authDTO;

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json(rest);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
});

/* Register a user, returns access token and user info in response body and sets refreshToken as an httpOnly cookie */
authRouter.post("/register", registerRequestValidator, async (req, res) => {
  const randomPassword = password.randomPassword({
    length: 8, // length of the password
    characters: [
      // acceptable characters in the password
      password.lower,
      password.upper,
      password.digits,
    ],
  });

  let createdUser = null;

  try {
    createdUser = await userService.createUser({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      role: "Admin", // TODO: pass in the role as a parameter to function for author and subscriber
      password: randomPassword,
    });

    // try to sign in the user and return the expiring token
    const authDTO = await authService.generateToken(
      req.body.email,
      randomPassword,
    );

    const { refreshToken, ...rest } = authDTO;

    // Send email with login details and ask to change password
    // once they change the password, admin should be verified
    // TODO: change this in part 2 of the ticket @Dhruv
    await authService.sendPasswordSetupLink(
      req.body.email,
      randomPassword,
      createdUser,
    );

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json(rest);
  } catch (error: unknown) {
    if (createdUser != null) {
      // rollback created user if we could not log them in
      await userService.deleteUserByEmail(createdUser.email);
    }
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
});

/* Returns access token in response body and sets refreshToken as an httpOnly cookie */
authRouter.post("/refresh", async (req, res) => {
  try {
    const token = await authService.renewToken(req.cookies.refreshToken);

    res
      .cookie("refreshToken", token.refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({ accessToken: token.accessToken });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
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
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
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
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },
);

export default authRouter;
