import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";

import { UserRole } from "../../../constants/Enums";
import { LOGIN_PAGE, UNAUTHORIZED_PAGE } from "../../../constants/Routes";
import AuthContext from "../../../contexts/AuthContext";

type PrivateRouteProps = {
  component: React.FC;
  path: string;
  exact: boolean;
  requiredRoles: Array<UserRole>;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component,
  exact,
  path,
  requiredRoles,
}: PrivateRouteProps) => {
  const { authenticatedUser } = useContext(AuthContext);

  if (!authenticatedUser) {
    return <Redirect to={LOGIN_PAGE} />;
  }

  const userHasRequiredRole = requiredRoles.includes(authenticatedUser.role);

  return userHasRequiredRole ? (
    <Route path={path} exact={exact} component={component} />
  ) : (
    <Redirect to={UNAUTHORIZED_PAGE} />
  );
};

export default PrivateRoute;
