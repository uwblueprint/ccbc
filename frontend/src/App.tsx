import "bootstrap/dist/css/bootstrap.min.css";

import { ChakraProvider } from "@chakra-ui/react";
import React, { useReducer, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

/* Pages */
import AuthActions from "./components/auth/AuthActions";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/auth/routes/PrivateRoute";
import Signup from "./components/auth/Signup";
import AdminDashboard from "./components/pages/AdminDashboard/AdminDashboard";
import CreateReviewPage from "./components/pages/CreateReviewPage";
import Default from "./components/pages/Default";
import EditReviewPage from "./components/pages/EditReviewPage";
import MagazineReview from "./components/pages/MagazineReview";
import NotFound from "./components/pages/NotFound";
import PreviewReviewTest from "./components/pages/PreviewReviewTest";
import Profile from "./components/pages/Profile";
import Unauthorized from "./components/pages/UnauthorizedPage";
import { AUTHENTICATED_USER_KEY } from "./constants/AuthConstants";
import { UserRole } from "./constants/Enums";
import * as Routes from "./constants/Routes";
import AuthContext from "./contexts/AuthContext";
import SampleContext, {
  DEFAULT_SAMPLE_CONTEXT,
} from "./contexts/SampleContext";
import SampleContextDispatcherContext from "./contexts/SampleContextDispatcherContext";
import sampleContextReducer from "./reducers/SampleContextReducer";
import customTheme from "./theme/index";
import { AuthenticatedUser } from "./types/AuthTypes";
import { getLocalStorageObj } from "./utils/LocalStorageUtils";

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
                <PrivateRoute
                  exact
                  path={Routes.CREATE_REVIEW_PAGE}
                  component={CreateReviewPage}
                  requiredRoles={[UserRole.Admin]}
                />
                <PrivateRoute
                  exact
                  path={Routes.EDIT_REVIEW_PAGE}
                  component={EditReviewPage}
                  requiredRoles={[UserRole.Admin]}
                />
                <Route
                  exact={false}
                  path={Routes.AUTH_ACTIONS}
                  component={AuthActions}
                />
                <PrivateRoute
                  exact
                  path={Routes.DEFAULT_PAGE}
                  component={Default}
                  requiredRoles={[UserRole.Admin, UserRole.Subscriber]}
                />
                <Route
                  exact
                  path={Routes.PREVIEW_REVIEW_TEST}
                  component={PreviewReviewTest}
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
