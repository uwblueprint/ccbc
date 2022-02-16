import { getLocalStorageObjProperty } from "../utils/LocalStorageUtils";

const AUTHENTICATED_USER_KEY = `${window.location.hostname}:AUTHENTICATED_USER`;

const SETUP_PASSWORD_MODE = "setup-password";
const VERIFY_USER_MODE = "verify-user";
const RESET_PASSWORD_MODE = "reset-password";
const RECOVER_EMAIL_MODE = "recover-email";

export const BEARER_TOKEN = `Bearer ${getLocalStorageObjProperty(
  AUTHENTICATED_USER_KEY,
  "accessToken",
)}`;

export {
  AUTHENTICATED_USER_KEY,
  RECOVER_EMAIL_MODE,
  RESET_PASSWORD_MODE,
  SETUP_PASSWORD_MODE,
  VERIFY_USER_MODE,
};
