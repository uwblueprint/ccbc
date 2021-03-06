import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";

import { UserRole } from "../../../constants/Enums";
import { LOGIN_PAGE, UNAUTHORIZED_PAGE } from "../../../constants/Routes";
import AuthContext from "../../../contexts/AuthContext";
import NavBar from "../../common/NavBar";

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

  const userHasRequiredRole = requiredRoles.includes(
    authenticatedUser.roleType,
  );

  return userHasRequiredRole ? (
    <div>
      <NavBar />
      <Route path={path} exact={exact} component={component} />
    </div>
  ) : (
    <Redirect to={UNAUTHORIZED_PAGE} />
  );
};

export default PrivateRoute;
