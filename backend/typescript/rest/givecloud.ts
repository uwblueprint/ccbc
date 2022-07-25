import { Router } from "express";
import { body, validationResult } from "express-validator";
import AuthService from "../services/implementations/authService";
import UserService from "../services/implementations/userService";
import { sendErrorResponse } from "../utilities/errorResponse";
import { Role } from "../types";
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
  body("supporter.membership.name", "membership name is required").exists(),
  body(
    "supporter.membership.days_to_expire",
    "membership_expiry_date is required",
  ).exists(),
  body("supporter.email", "suppoerter email is required").exists(),
  body("supporter.first_name", "supporter first_name is required").exists(),
  body("supporter.last_name", "supporter last_name is required").exists(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
      }
      const { supporter } = req.body;
      const { email, membership } = supporter;
      const subscriptionExpiresOn = new Date();
      let roleType: Role = "Subscriber";
      if (membership.name === "Professional Creator Membership") {
        roleType = "Author";
      }
      try {
        await userService.getUserByEmail(email);
        res.status(200).json("remove and implement renew logic here");
      } catch {
        subscriptionExpiresOn.setDate(
          subscriptionExpiresOn.getDate() + membership.days_to_expire,
        );
        const authDTO = await authService.createUserAndSendRegistrationEmail(
          supporter.first_name,
          supporter.last_name,
          email,
          roleType,
          subscriptionExpiresOn,
        );

        res.status(200).json(authDtoToToUserDto(authDTO));
      }
    } catch (e: unknown) {
      sendErrorResponse(e, res);
    }
  },
);

export default givecloudRouter;
