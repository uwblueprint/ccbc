import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { createHmac } from "crypto";
import password from "secure-random-password";
import AuthService from "../services/implementations/authService";
import UserService from "../services/implementations/userService";
import { sendErrorResponse } from "../utilities/errorResponse";
import { Role } from "../types";
import EmailService from "../services/implementations/emailService";
import IEmailService from "../services/interfaces/emailService";
import IAuthService from "../services/interfaces/authService";
import nodemailerConfig from "../nodemailer.config";
import authDtoToToUserDto from "../utilities/authUtils";
import isGiveCloudEnabled from "../middlewares/givecloud";

const givecloudRouter: Router = Router();

const userService = new UserService();
const emailService: IEmailService = new EmailService(nodemailerConfig);
const authService: IAuthService = new AuthService(userService, emailService);
givecloudRouter.post(
  "/user.subscription_paid",
  isGiveCloudEnabled(),
  body(
    "supporter.groups[0].name",
    "supporter.groups.name is required",
  ).exists(),
  body(
    "supporter.groups[0].days_left",
    "supporter.groups.days_left is required",
  ).exists(),
  body("supporter.email", "supporter email is required").exists(),
  body("supporter.first_name", "supporter first_name is required").exists(),
  body("supporter.last_name", "supporter last_name is required").exists(),
  async (req: Request, res: Response) => {
    try {
      if (process.env.HMAC_SECRET_KEY) {
        const hash = createHmac("sha1", process.env.HMAC_SECRET_KEY)
          .update(JSON.stringify(req.body))
          .digest("hex");

        if (hash !== req.get("HTTP_X_GIVECLOUD_SIGNATURE")) {
          res.status(401).send(hash+"\n"+req.get("HTTP_X_GIVECLOUD_SIGNATURE"));
          return;
        }
      } else {
        throw new Error("No HMAC secret key set");
      }
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        const { supporter } = req.body;
        const { email, groups } = supporter;
        const subscriptionExpiresOn = new Date();
        let roleType: Role = "Subscriber";
        if (groups[0].name === "Professional Creator Membership") {
          roleType = "Author";
        }
        try {
          subscriptionExpiresOn.setDate(
            subscriptionExpiresOn.getDate() + groups[0].days_left,
          );
          await userService.getUserByEmail(email);
          const userDTO = await userService.updateUserSubscriptionbyEmail(
            email,
            subscriptionExpiresOn,
          );
          res.status(200).json(userDTO);
        } catch {
          const accessCode = password.randomPassword({
            length: 8, // length of the password
            characters: [
              // acceptable characters in the password
              password.lower,
              password.upper,
              password.digits,
            ],
          });

          const newUser = await userService.createUser({
            firstName: supporter.first_name,
            lastName: supporter.last_name,
            email,
            roleType,
            password: accessCode.toString(),
            subscriptionExpiresOn,
          });
          await authService.sendPasswordSetupLink(newUser, accessCode, true);
          res.status(201).json(newUser);
        }
      } else {
        res.status(400).json({ errors: errors.array() });
      }
    } catch (e: unknown) {
      sendErrorResponse(e, res);
    }
  },
);

export default givecloudRouter;
