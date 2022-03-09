import React from "react";
import { Redirect, useLocation } from "react-router-dom";

import {
  RECOVER_EMAIL_MODE,
  RESET_PASSWORD_MODE,
  SETUP_PASSWORD_MODE,
  VERIFY_USER_MODE,
} from "../../constants/AuthConstants";
import { HOME_PAGE } from "../../constants/Routes";
import { SetPassword, SetPasswordProps } from "./SetPassword";
import VerifyAccessCode from "./VerifyAccessCode";

/**
 * This component is the centeral component for auth related actions.
 * All auth actions are routed through here
 */
const AuthActions = (): React.ReactElement => {
  const { search, state } = useLocation<SetPasswordProps>();
  const searchParams = new URLSearchParams(search);

  const mode = searchParams.get("mode");
  const uid = searchParams.get("uid");
  const isNewAccount = searchParams.get("new-account")
    ? searchParams.get("new-account")?.toLowerCase() === "true"
    : null;

  if (mode === null) {
    // Checking that we have a mode
    return <Redirect to={HOME_PAGE} />;
  }

  return (
    <div>
      {(() => {
        switch (mode) {
          case VERIFY_USER_MODE:
            if (uid === null || isNewAccount === null)
              return <Redirect to={HOME_PAGE} />;
            return <VerifyAccessCode uid={uid} isNewAccount={isNewAccount} />;
          case SETUP_PASSWORD_MODE:
            return (
              <SetPassword
                email={state.email}
                uid={state.uid}
                isNewAccount={state.isNewAccount}
              />
            );
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
