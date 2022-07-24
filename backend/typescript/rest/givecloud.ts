import { Router } from "express";
import { body } from "express-validator";
import AuthService from "../services/implementations/authService";
import UserService from "../services/implementations/userService";
import { sendErrorResponse } from "../utilities/errorResponse";
import { Role } from "../types";
import { authDtoToToUserDto } from "../utilities/authUtils";

const givecloudRouter: Router = Router();

const userService = new UserService();
const authService = new AuthService(userService);

givecloudRouter.post(
  "/user.subscription_paid",
  body(
    "supporter.membership.name",
    "supporter.membership.days_to_expire",
    "supporter.email",
    "supporter.first_name",
    "supporter.last_name",
  ).exists(),
  async (req, res) => {
    try {
      const { supporter } = req.body;
      const { email, membership } = supporter;
      const subscriptionExpiresOn = new Date();
      let roleType: Role = "Subscriber";
      if (membership.name === "Professional Creator Membership") {
        roleType = "Author";
      }
      if ((await userService.getUserByEmail(email)) == null) {
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
      } else {
        res.status(400).json("user already exists");
      }
    } catch (e: unknown) {
      sendErrorResponse(e, res);
    }
  },
);

export default givecloudRouter;
