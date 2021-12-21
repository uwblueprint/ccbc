import { getLocalStorageObjProperty } from "../utils/LocalStorageUtils";

const AUTHENTICATED_USER_KEY = `${window.location.hostname}:AUTHENTICATED_USER`;

export const BEARER_TOKEN = `Bearer ${getLocalStorageObjProperty(
  AUTHENTICATED_USER_KEY,
  "accessToken",
)}`;

export default AUTHENTICATED_USER_KEY;
