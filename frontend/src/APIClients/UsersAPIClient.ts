import { AuthenticatedUser } from "../types/AuthTypes";
import baseAPIClient from "./BaseAPIClient";

const register = async (
  email: string,
  roleType = "Subscriber",
): Promise<AuthenticatedUser> => {
  const date = new Date(Date.now());
  date.setDate(date.getDate() - 1);

  const newSubscriber = {
    firstName: "",
    lastName: "",
    email,
    roleType,
    subscriptionExpiresOn: date,
  };

  try {
    const { data } = await baseAPIClient.post("/users/", newSubscriber, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    return null;
  }
};

export default {
  register,
};
