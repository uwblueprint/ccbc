import { Router } from "express";
import AuthService from "../services/implementations/authService";
import UserService from "../services/implementations/userService";
import { sendErrorResponse } from "../utilities/errorResponse";
import { AuthDTO, Role, UserDTO } from "../types";

const givecloudRouter: Router = Router();

const authDtoToToUserDto = (authDTO: AuthDTO): UserDTO => {
  const userDTO: UserDTO = (({
    id,
    firstName,
    lastName,
    email,
    roleType,
    subscriptionExpiresOn,
  }) => ({ id, firstName, lastName, email, roleType, subscriptionExpiresOn }))(
    authDTO,
  );
  return userDTO;
};

const userService = new UserService();
const authService = new AuthService(userService);

givecloudRouter.post("/user.subscription_paid", async (req, res) => {
  try {
    const { membership, supporter } = req.body;
    const { email } = supporter;
    const subscriptionExpiresOn = new Date();
    let roleType: Role = "Subscriber";
    if (membership.name === "Professional Creator Membership") {
      roleType = "Author";
    }
    if ((await userService.getUserByEmail(email)) == null) {
      subscriptionExpiresOn.setDate(
        subscriptionExpiresOn.getDate() + membership.days_to_expire,
      );
      const authDTO = await authService.sendRegistrationEmail(
        supporter.first_name,
        supporter.last_name,
        email,
        roleType,
        subscriptionExpiresOn,
      );

      res.status(201).json(authDtoToToUserDto(authDTO));
    } else {
      res.status(400).json("user already exists");
    }
  } catch (e: unknown) {
    sendErrorResponse(e, res);
  }
});

export default givecloudRouter;
