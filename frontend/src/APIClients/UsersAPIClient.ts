import { AuthenticatedUser } from "../types/AuthTypes";
import baseAPIClient from "./BaseAPIClient";

const register = async (email: string): Promise<AuthenticatedUser> => {
  const newSubscriber = {
    firstName: "",
    lastName: "",
    email,
    roleType: "Subscriber",
    subscriptionExpiresOn: null,
  };

  try {
    const { data } = await baseAPIClient.post(
      "/users/",
      newSubscriber,
      { withCredentials: true },
    );
    return data;
  } catch (error) {
    return null;
  }
};

export default {
  register,
};
