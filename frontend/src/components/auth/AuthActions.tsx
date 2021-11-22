import React from "react";
import { Redirect, useLocation } from "react-router-dom";

import {
  RECOVER_EMAIL_MODE,
  RESET_PASSWORD_MODE,
  SETUP_PASSWORD_MODE,
} from "../../constants/AuthConstants";
import { HOME_PAGE } from "../../constants/Routes";
import { SetPassword } from "./SetPassword";

const AuthActions = (): React.ReactElement => {
  const { search } = useLocation();

  const searchParams = new URLSearchParams(search);
  const mode = searchParams.get("mode");
  const uid = searchParams.get("uid");

  if (mode === null) {
    // Checking that we have a mode
    return <Redirect to={HOME_PAGE} />;
  }

  return (
    <div>
      {(() => {
        switch (mode) {
          case SETUP_PASSWORD_MODE:
            if (uid === null) return <Redirect to={HOME_PAGE} />;
            return <SetPassword uid={uid} />;
          case RESET_PASSWORD_MODE:
            return <div> RESET PASSWORD </div>; // TODO: replace this with relevant component when completed
          case RECOVER_EMAIL_MODE:
            return <div> RECOVER EMAIL</div>; // TODO: replace this with relevant component when completed
          default:
            return null;
        }
      })()}
    </div>
  );
};

export default AuthActions;
