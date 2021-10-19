import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AdminRoute from "./AdminRoute";

import AuthContext from "../../../contexts/AuthContext";
import { LOGIN_PAGE } from "../../../constants/Routes";

type PrivateRouteProps = {
  component: React.FC;
  path: string;
  exact: boolean;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component,
  exact,
  path,
}: PrivateRouteProps) => {
  const { authenticatedUser } = useContext(AuthContext);

  // const userHasRequiredRole = requiredRoles.includes(authenticatedUser.role);

  return authenticatedUser ? (
    <Route path={path} exact={exact} component={component} />
  ) : (
    <Redirect to={LOGIN_PAGE} />
  );
};

export default PrivateRoute;
