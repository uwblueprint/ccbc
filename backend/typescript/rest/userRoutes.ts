import { Router } from "express";

import { isAuthorizedByRole } from "../middlewares/auth";
import {
  createUserDtoValidator,
  updateUserDtoValidator,
} from "../middlewares/validators/userValidators";
import nodemailerConfig from "../nodemailer.config";
import AuthService from "../services/implementations/authService";
import EmailService from "../services/implementations/emailService";
import UserService from "../services/implementations/userService";
import IAuthService from "../services/interfaces/authService";
import IEmailService from "../services/interfaces/emailService";
import IUserService from "../services/interfaces/userService";
import { UserDTO } from "../types";
import { getErrorMessage, sendErrorResponse } from "../utilities/errorResponse";
import sendResponseByMimeType from "../utilities/responseUtil";

const userRouter: Router = Router();
userRouter.use(isAuthorizedByRole(new Set(["Admin"])));

const userService: IUserService = new UserService();
const emailService: IEmailService = new EmailService(nodemailerConfig);
const authService: IAuthService = new AuthService(userService, emailService);

/* Get all users, optionally filter by a userId or email query parameter to retrieve a single user */
userRouter.get("/", async (req, res) => {
  const { id, email } = req.query;
  const contentType = req.headers["content-type"];

  if (id && email) {
    await sendResponseByMimeType(res, 400, contentType, [
      {
        error: "Cannot query by both userId and email.",
      },
    ]);
    return;
  }

  if (!id && !email) {
    try {
      const users = await userService.getUsers();
      await sendResponseByMimeType<UserDTO>(res, 200, contentType, users);
    } catch (error: unknown) {
      await sendResponseByMimeType(res, 500, contentType, [
        {
          error: getErrorMessage(error),
        },
      ]);
    }
    return;
  }

  if (id) {
    if (typeof id !== "number" || !Number.isInteger(id)) {
      res.status(400).json({ error: "id query parameter must be an integer." });
    } else {
      try {
        const user = await userService.getUserById(id);
        res.status(200).json(user);
      } catch (error: unknown) {
        sendErrorResponse(error, res);
      }
    }
    return;
  }

  if (email) {
    if (typeof email !== "string") {
      res
        .status(400)
        .json({ error: "email query parameter must be a string." });
    } else {
      try {
        const user = await userService.getUserByEmail(email);
        res.status(200).json(user);
      } catch (error: unknown) {
        sendErrorResponse(error, res);
      }
    }
  }
});

/* Create a user */
userRouter.post("/", createUserDtoValidator, async (req, res) => {
  try {
    const newUser = await userService.createUser({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      roleType: req.body.roleType,
      password: req.body.password,
      active: req.body.active,
    });

    await authService.sendEmailVerificationLink(req.body.email);

    res.status(201).json(newUser);
  } catch (error: unknown) {
    sendErrorResponse(error, res);
  }
});

/* Update the user with the specified userId */
userRouter.put("/:userId", updateUserDtoValidator, async (req, res) => {
  try {
    const updatedUser = await userService.updateUserById(req.params.userId, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      roleType: req.body.roleType,
      active: req.body.active,
    });
    res.status(200).json(updatedUser);
  } catch (error: unknown) {
    sendErrorResponse(error, res);
  }
});

/* Delete a user by userId or email, specified through a query parameter */
userRouter.delete("/", async (req, res) => {
  const { id, email } = req.query;

  if (id && email) {
    res.status(400).json({ error: "Cannot delete by both userId and email." });
    return;
  }

  if (id) {
    if (typeof id !== "number" || !Number.isInteger(id)) {
      res.status(400).json({ error: "id query parameter must be an integer." });
    } else {
      try {
        await userService.deleteUserById(id);
        res.status(204).send();
      } catch (error: unknown) {
        sendErrorResponse(error, res);
      }
    }
    return;
  }

  if (email) {
    if (typeof email !== "string") {
      res
        .status(400)
        .json({ error: "email query parameter must be a string." });
    } else {
      try {
        await userService.deleteUserByEmail(email);
        res.status(204).send();
      } catch (error: unknown) {
        sendErrorResponse(error, res);
      }
    }
    return;
  }

  res
    .status(400)
    .json({ error: "Must supply one of userId or email as query parameter." });
});

export default userRouter;
