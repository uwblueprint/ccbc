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
  const key = `${window.location.hostname}:AUTHENTICATED_USER`;
  const token = `Bearer ${getLocalStorageObjProperty(key, "accessToken")}`;
  return token;
};

export default { validateEmail, getBearerToken };
