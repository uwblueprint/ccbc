import { Router } from "express";
import { body, validationResult } from "express-validator";
import AuthService from "../services/implementations/authService";
import UserService from "../services/implementations/userService";
import { sendErrorResponse } from "../utilities/errorResponse";
import { Role, UserDTO } from "../types";
import EmailService from "../services/implementations/emailService";
import IEmailService from "../services/interfaces/emailService";
import IAuthService from "../services/interfaces/authService";
import nodemailerConfig from "../nodemailer.config";
import authDtoToToUserDto from "../utilities/authUtils";

const givecloudRouter: Router = Router();

const userService = new UserService();
const emailService: IEmailService = new EmailService(nodemailerConfig);
const authService: IAuthService = new AuthService(userService, emailService);

givecloudRouter.post(
  "/user.subscription_paid",
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
  async (req, res) => {
    try {
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
          res.status(201).json(userDTO);
        } catch {
          const authDTO = await authService.createUserAndSendRegistrationEmail(
            supporter.first_name,
            supporter.last_name,
            email,
            roleType,
            subscriptionExpiresOn,
          );

          res.status(200).json(authDtoToToUserDto(authDTO));
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
