import { userInfo } from "os";
import React, { useContext } from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import AuthContext from "../../../contexts/AuthContext";
import { LOGIN_PAGE, UNAUTHORIZED_PAGE } from "../../../constants/Routes";


type AdminRouteProps = {
  component: React.FC;
  path: string;
  exact: boolean;
};
 
const AdminRoute: React.FC<AdminRouteProps> = ({
  component,
  exact,
  path,
}: AdminRouteProps) => {
  const { authenticatedUser } = useContext(AuthContext);

  return (
    authenticatedUser && authenticatedUser.role==="Admin" ? (
      <Route path={path} exact={exact} component={component} />
    ) : (
      <Redirect to={{
        pathname: authenticatedUser ? UNAUTHORIZED_PAGE : LOGIN_PAGE,
        }} 
      />
    ) 
  )
};

export default AdminRoute;
