import "bootstrap/dist/css/bootstrap.min.css";

import { ChakraProvider } from "@chakra-ui/react";
import React, { useReducer, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

/* Pages */
import AuthActions from "./components/auth/AuthActions";
import ForgotPassword from "./components/auth/ForgotPassword";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/auth/routes/PrivateRoute";
import Signup from "./components/auth/Signup";
import AdminDashboard from "./components/pages/AdminDashboard/AdminDashboard";
import CreateReviewPage from "./components/pages/CreateReviewPage";
import Default from "./components/pages/Default";
import DisplayReview from "./components/pages/DisplayReview/DisplayReview";
import EditReviewPage from "./components/pages/EditReviewPage";
import MagazineReview from "./components/pages/MagazineReview";
import MockSearchPage from "./components/pages/MockSearch/MockSearchPage";
import NotFound from "./components/pages/NotFound";
import Profile from "./components/pages/Profile";
import SearchBox from "./components/pages/SearchBox";
import SearchReviews from "./components/pages/SearchReviews/SearchReviews";
import Unauthorized from "./components/pages/UnauthorizedPage";
import { AUTHENTICATED_USER_KEY } from "./constants/AuthConstants";
import { UserRole } from "./constants/Enums";
import * as Routes from "./constants/Routes";
import AuthContext from "./contexts/AuthContext";
import NotificationContext, {
  DEFAULT_NOTIFICATION_CONTEXT,
} from "./contexts/NotificationContext";
import NotificationContextDispatcherContext from "./contexts/NotificationContextDispatcherContext";
import SampleContext, {
  DEFAULT_SAMPLE_CONTEXT,
} from "./contexts/SampleContext";
import SampleContextDispatcherContext from "./contexts/SampleContextDispatcherContext";
import notificationContextReducer from "./reducers/NotificationContextReducer";
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

  const [notificationContext, dispatchNotificationContextUpdate] = useReducer(
    notificationContextReducer,
    DEFAULT_NOTIFICATION_CONTEXT,
  );

  return (
    <ChakraProvider theme={customTheme}>
      <SampleContext.Provider value={sampleContext}>
        <SampleContextDispatcherContext.Provider
          value={dispatchSampleContextUpdate}
        >
          <NotificationContext.Provider value={notificationContext}>
            <NotificationContextDispatcherContext.Provider
              value={dispatchNotificationContextUpdate}
            >
              <AuthContext.Provider
                value={{ authenticatedUser, setAuthenticatedUser }}
              >
                <Router>
                  <Switch>
                    <Route exact path={Routes.LOGIN_PAGE} component={Login} />
                    <Route
                      exact
                      path={Routes.FORGOT_PASSWORD_PAGE}
                      component={ForgotPassword}
                    />
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
                    <Route
                      exact
                      path={Routes.MOCK_SEARCH_PAGE}
                      component={MockSearchPage}
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
                    <PrivateRoute
                      exact
                      path={Routes.DISPLAY_REVIEW_PAGE}
                      component={DisplayReview}
                      requiredRoles={[
                        UserRole.Admin,
                        UserRole.Subscriber,
                        UserRole.Creator,
                      ]}
                    />
                    <PrivateRoute
                      exact
                      path={Routes.SEARCH_REVIEWS_PAGE}
                      component={SearchReviews}
                      requiredRoles={[
                        UserRole.Admin,
                        UserRole.Subscriber,
                        UserRole.Creator,
                      ]}
                    />
                    <Route
                      exact
                      path={Routes.SEARCH_BOX}
                      component={SearchBox}
                    />
                    <Route
                      exact
                      path={Routes.NOT_FOUND_PAGE}
                      component={NotFound}
                    />
                    <Route exact path="*" component={NotFound} />
                  </Switch>
                </Router>
              </AuthContext.Provider>
            </NotificationContextDispatcherContext.Provider>
          </NotificationContext.Provider>
        </SampleContextDispatcherContext.Provider>
      </SampleContext.Provider>
    </ChakraProvider>
  );
};

export default App;
