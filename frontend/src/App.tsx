import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

/* Routes */
import * as Routes from "./constants/Routes";
import PrivateRoute from "./components/auth/routes/PrivateRoute";
import AdminRoute from "./components/auth/routes/AdminRoute";

/* Pages */
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import AdminDashboard from "./components/pages/AdminDashboard";
import MagazineReview from "./components/pages/MagazineReview";
import Profile from "./components/pages/Profile";
import CreatePage from "./components/pages/CreatePage";
import Default from "./components/pages/Default";
import DisplayPage from "./components/pages/DisplayPage";
import NotFound from "./components/pages/NotFound";
import Unauthorized from "./components/pages/Unauthorized";
import UpdatePage from "./components/pages/UpdatePage";

import AUTHENTICATED_USER_KEY from "./constants/AuthConstants";
import AuthContext from "./contexts/AuthContext";
import { getLocalStorageObj } from "./utils/LocalStorageUtils";
import SampleContext, {
  DEFAULT_SAMPLE_CONTEXT,
} from "./contexts/SampleContext";
import sampleContextReducer from "./reducers/SampleContextReducer";
import SampleContextDispatcherContext from "./contexts/SampleContextDispatcherContext";

import { AuthenticatedUser } from "./types/AuthTypes";

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
              <PrivateRoute exact path={Routes.HOME_PAGE} component={Default} />
              <PrivateRoute
                exact
                path={Routes.MAGAZINE_REVIEW_PAGE}
                component={MagazineReview}
              />
              <PrivateRoute
                exact
                path={Routes.PROFILE_PAGE}
                component={Profile}
              />
              <AdminRoute
                exact
                path={Routes.ADMIN_DASHBOARD_PAGE}
                component={AdminDashboard}
              />
              <Route exact path="*" component={NotFound} />
            </Switch>
          </Router>
        </AuthContext.Provider>
      </SampleContextDispatcherContext.Provider>
    </SampleContext.Provider>
  );
};

export default App;
