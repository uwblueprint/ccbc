import { createContext } from "react";
import { AuthenticatedUser } from "../types/AuthTypes";

type AuthContextType = {
  authenticatedUser: AuthenticatedUser;
  setAuthenticatedUser: (_authenticatedUser: AuthenticatedUser) => void;
};

const AuthContext = createContext<AuthContextType>({
  authenticatedUser: null,
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  setAuthenticatedUser: (_authenticatedUser: AuthenticatedUser): void => {},
});

export default AuthContext;
