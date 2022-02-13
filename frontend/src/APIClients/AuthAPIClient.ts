import { User } from "firebase/auth";

import { AUTHENTICATED_USER_KEY } from "../constants/AuthConstants";
import { AuthenticatedUser } from "../types/AuthTypes";
import {
  getLocalStorageObjProperty,
  setLocalStorageObjProperty,
} from "../utils/LocalStorageUtils";
import baseAPIClient from "./BaseAPIClient";

const login = async (
  email: string,
  password: string,
): Promise<AuthenticatedUser> => {
  try {
    const { data } = await baseAPIClient.post(
      "/auth/login",
      { email, password },
      { withCredentials: true },
    );
    localStorage.setItem(AUTHENTICATED_USER_KEY, JSON.stringify(data));
    return data;
  } catch (error) {
    return null;
  }
};

const loginWithGoogle = async (idToken: string): Promise<AuthenticatedUser> => {
  try {
    const { data } = await baseAPIClient.post(
      "/auth/login",
      { idToken },
      { withCredentials: true },
    );
    localStorage.setItem(AUTHENTICATED_USER_KEY, JSON.stringify(data));
    return data;
  } catch (error) {
    return null;
  }
};

const logout = async (userId: string | undefined): Promise<boolean> => {
  const bearerToken = `Bearer ${getLocalStorageObjProperty(
    AUTHENTICATED_USER_KEY,
    "accessToken",
  )}`;
  try {
    await baseAPIClient.post(
      `/auth/logout/${userId}`,
      {},
      { headers: { Authorization: bearerToken } },
    );
    localStorage.removeItem(AUTHENTICATED_USER_KEY);
    return true;
  } catch (error) {
    return false;
  }
};

const register = async (
  firstName: string,
  lastName: string,
  email: string,
): Promise<AuthenticatedUser> => {
  try {
    const { data } = await baseAPIClient.post(
      "/auth/register",
      { firstName, lastName, email },
      { withCredentials: true },
    );
    return data;
  } catch (error) {
    return null;
  }
};

const resetPassword = async (email: string | undefined): Promise<boolean> => {
  const bearerToken = `Bearer ${getLocalStorageObjProperty(
    AUTHENTICATED_USER_KEY,
    "accessToken",
  )}`;
  try {
    await baseAPIClient.post(
      `/auth/resetPassword/${email}`,
      {},
      { headers: { Authorization: bearerToken } },
    );
    return true;
  } catch (error) {
    return false;
  }
};

// for testing only, refresh does not need to be exposed in the client
const refresh = async (): Promise<boolean> => {
  try {
    const { data } = await baseAPIClient.post(
      "/auth/refresh",
      {},
      { withCredentials: true },
    );
    setLocalStorageObjProperty(
      AUTHENTICATED_USER_KEY,
      "accessToken",
      data.accessToken,
    );
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Retrieve the firebase user given a user id
 * @param uid user's id
 * @returns User: a firebase user instance
 * @throws error if could not retrieve user by uid
 */
const getFirebaseUserByUid = async (uid: string): Promise<User> => {
  const { data } = await baseAPIClient.get(`/auth/${uid}`);
  return data;
};

/**
 * Sets the verify status of a user to true on firebase
 * @param uid user's id to identify record in firebase
 * @returns true if able to verify the user by uid
 * @throws error if could not verify user by uid
 */
const verifyEmail = async (uid: string): Promise<boolean> => {
  try {
    await baseAPIClient.post(`/auth/verifyEmail/${uid}`);
    return true;
  } catch (error) {
    return false;
  }
};

export default {
  login,
  logout,
  loginWithGoogle,
  register,
  resetPassword,
  refresh,
  getFirebaseUserByUid,
  verifyEmail,
};
