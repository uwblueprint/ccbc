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
  async (req: Request, res: Response) => {
    try {
      if (process.env.HMAC_SECRET_KEY) {
        const hash = createHmac("sha1", process.env.HMAC_SECRET_KEY)
          .update(JSON.stringify(req.body))
          .digest("hex");

        if (hash !== req.get("X-Givecloud-Signature")) {
          res.status(401).send("Unauthorized");
          return;
        }
      } else {
        throw new Error("No HMAC secret key set");
      }
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        const { membership, email, firstName, lastName } = req.body.supporters[0];
        const subscriptionExpiresOn = new Date();
        subscriptionExpiresOn.setDate(
          subscriptionExpiresOn.getDate() + membership.duration,
        );

        let roleType: Role = "Subscriber";
        if (membership.vendor_membership_id === "PROFESSIONAL") {
          roleType = "Author";
        }

        try {
          await userService.getUserByEmail(email);
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
            firstName,
            lastName,
            email,
            roleType,
            password: accessCode.toString(),
            subscriptionExpiresOn,
          });
          await authService.sendPasswordSetupLink(newUser, accessCode, true);
        }

        const userDTO = await userService.updateUserSubscriptionbyEmail(
          email,
          subscriptionExpiresOn,
        );

        emailService.sendEmail(
          email,
          "Your CCBC Subscription has been renewed!",
          `Your CCBC Subscription has been renewed! Your subscription as a ${roleType} will expire on ${subscriptionExpiresOn}.`,
        );

        res.status(200).json(userDTO);
      } else {
        res.status(400).json({ errors: errors.array() });
      }
    } catch (e: unknown) {
      sendErrorResponse(e, res);
    }
  },
);

export default givecloudRouter;
