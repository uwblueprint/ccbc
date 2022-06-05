import { AUTHENTICATED_USER_KEY } from "../constants/AuthConstants";
import { getLocalStorageObjProperty } from "./LocalStorageUtils";

const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Fetches the auth token from local storage
 * @returns The token value, prepended by 'Bearer'
 */
export const getBearerToken = (): string => {
  const token = `Bearer ${getLocalStorageObjProperty(
    AUTHENTICATED_USER_KEY,
    "accessToken",
  )}`;
  return token;
};

export default { validateEmail, getBearerToken };
