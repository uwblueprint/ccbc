import { AuthenticatedUser } from "../types/AuthTypes";
import baseAPIClient from "./BaseAPIClient";

const register = async (
  email: string,
  roleType = "Subscriber",
): Promise<AuthenticatedUser> => {
  const newSubscriber = {
    firstName: "",
    lastName: "",
    email,
    roleType,
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

const getUserByEmail = async (email: string): Promise<AuthenticatedUser> => {
  try {
    const encoded = encodeURIComponent(email);
    const { data } = await baseAPIClient.get(`/users?email=${encoded}`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    throw new Error(`Get user failed: ${error}`);
  }
};

export default {
  register,
  getUserByEmail,
};
