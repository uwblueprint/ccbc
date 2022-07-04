import { Router } from "express";
import AuthService from "../services/implementations/authService";
import UserService from "../services/implementations/userService";
import { sendErrorResponse } from "../utilities/errorResponse";
import { Role } from "../types";

const givecloudRouter: Router = Router();

givecloudRouter.post("/", async (req, res) => {
  const membership = req.body["membership"];
  const supporter = req.body["supporter"];
  let date = new Date();

  const userService = new UserService();
  const authService = new AuthService(userService);

  try {
    const email = supporter["email"];
    let roleType: Role = "Subscriber";
    if (membership["name"] == "Professional Creator Membership") {
      roleType = "Author";
    }
    if ((await userService.getUserByEmail(email)) == null) {
      date.setDate(date.getDate() + membership["days_to_expire"]);
      const user = await userService.createUser({
        firstName: supporter["first_name"],
        lastName: supporter["last_name"],
        email: supporter["email"],
        roleType: roleType,
        subscriptionExpiresOn: date,
        password: "",
      });
      await authService.sendEmailVerificationLink(email);
      res.status(201).json(user);
    } else {
      res.status(400).json("user already exists");
    }
  } catch (e: unknown) {
    sendErrorResponse(e, res);
  }
});

export default givecloudRouter;
