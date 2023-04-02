import axios, { AxiosRequestConfig } from "axios";
import jwt from "jsonwebtoken";

import { AUTHENTICATED_USER_KEY } from "../constants/AuthConstants";
import { DecodedJWT } from "../types/AuthTypes";
import { setLocalStorageObjProperty } from "../utils/LocalStorageUtils";

const baseAPIClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

baseAPIClient.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const newConfig = { ...config };

  const currentURL = window.location.pathname.split("/");
  const isCreatorProfilePage = currentURL.includes("creators");

  // if access token in header has expired, do a refresh
  const authHeaderParts = config.headers.Authorization?.split(" ");
  if (
    authHeaderParts &&
    authHeaderParts.length >= 2 &&
    authHeaderParts[0].toLowerCase() === "bearer"
  ) {
    const decodedToken = jwt.decode(authHeaderParts[1]) as DecodedJWT;

    if (
      decodedToken &&
      (typeof decodedToken === "string" ||
        decodedToken.exp <= Math.round(new Date().getTime() / 1000))
    ) {
      let data;
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/auth/refresh`,
          {},
          { withCredentials: true },
        );
        data = res.data;
      } catch (err) {
        localStorage.removeItem(AUTHENTICATED_USER_KEY);
        window.location.href = "/login";
      }

      const accessToken = data.accessToken || data.access_token;
      setLocalStorageObjProperty(
        AUTHENTICATED_USER_KEY,
        "accessToken",
        accessToken,
      );

      newConfig.headers.Authorization = `Bearer ${accessToken}`;
    } else if (decodedToken === null && isCreatorProfilePage) {
      localStorage.removeItem(AUTHENTICATED_USER_KEY); // do not redirct if url of the form https:localhost:3000/creators/1
    } else if (decodedToken === null) {
      localStorage.removeItem(AUTHENTICATED_USER_KEY);
      window.location.href = "/login";
    }
  }

  return newConfig;
});

export default baseAPIClient;
