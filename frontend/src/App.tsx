import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

/* Routes */
import * as Routes from "./constants/Routes";
import PrivateRoute from "./components/auth/routes/PrivateRoute";

/* Pages */
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import AdminDashboard from "./components/pages/AdminDashboard";
import MagazineReview from "./components/pages/MagazineReview";
import Profile from "./components/pages/Profile";
import NotFound from "./components/pages/NotFound";
import Unauthorized from "./components/pages/UnauthorizedPage";

import AUTHENTICATED_USER_KEY from "./constants/AuthConstants";
import AuthContext from "./contexts/AuthContext";
import { getLocalStorageObj } from "./utils/LocalStorageUtils";
import { UserRole } from "./constants/Enums";
import SampleContext, {
  DEFAULT_SAMPLE_CONTEXT,
} from "./contexts/SampleContext";
import sampleContextReducer from "./reducers/SampleContextReducer";
import SampleContextDispatcherContext from "./contexts/SampleContextDispatcherContext";

import { AuthenticatedUser } from "./types/AuthTypes";
import customTheme from "./theme/index";

const App = (): React.ReactElement => {
  const currentUser: AuthenticatedUser = getLocalStorageObj<AuthenticatedUser>(
    AUTHENTICATED_USER_KEY,
  );

  const [authenticatedUser, setAuthenticatedUser] = useState<AuthenticatedUser>(
    currentUser,
  );

  // Some sort of global state. Context API replaces redux.
  // Split related states into different contexts as necessary.
  // Split dispatcher and state into separate contexts as necessary.
  const [sampleContext, dispatchSampleContextUpdate] = useReducer(
    sampleContextReducer,
    DEFAULT_SAMPLE_CONTEXT,
  );

  return (
    <ChakraProvider theme={customTheme}>
      <SampleContext.Provider value={sampleContext}>
        <SampleContextDispatcherContext.Provider
          value={dispatchSampleContextUpdate}
        >
          <AuthContext.Provider
            value={{ authenticatedUser, setAuthenticatedUser }}
          >
            <Router>
              <Switch>
                <Route exact path={Routes.LOGIN_PAGE} component={Login} />
                <Route exact path={Routes.SIGNUP_PAGE} component={Signup} />
                <Route
                  exact
                  path={Routes.UNAUTHORIZED_PAGE}
                  component={Unauthorized}
                />
                <PrivateRoute
                  exact
                  path={Routes.HOME_PAGE}
                  component={MagazineReview}
                  requiredRoles={[UserRole.Admin, UserRole.Subscriber]}
                />
                <PrivateRoute
                  exact
                  path={Routes.PROFILE_PAGE}
                  component={Profile}
                  requiredRoles={[UserRole.Admin, UserRole.Subscriber]}
                />
                <PrivateRoute
                  exact
                  path={Routes.ADMIN_DASHBOARD_PAGE}
                  component={AdminDashboard}
                  requiredRoles={[UserRole.Admin]}
                />
                <Route exact path="*" component={NotFound} />
              </Switch>
            </Router>
          </AuthContext.Provider>
        </SampleContextDispatcherContext.Provider>
      </SampleContext.Provider>
    </ChakraProvider>
  );
};

export default App;
