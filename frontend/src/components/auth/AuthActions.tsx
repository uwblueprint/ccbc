import React from "react";
import { Redirect, useLocation } from "react-router-dom";

import { HOME_PAGE } from "../../constants/Routes";
import { SetPassword, SetPasswordProps } from "./SetPassword";

const AuthActions = (): React.ReactElement => {
  const { search } = useLocation();

  const searchParams = new URLSearchParams(search);
  const mode = searchParams.get("mode");
  const oobCode = searchParams.get("oobCode");
  const apiKey = searchParams.get("apiKey");
  const firstTime = searchParams.get("first-time");

  if (oobCode === null || apiKey === null || mode === null) {
    // Checking that we have necessary fields from url
    return <Redirect to={HOME_PAGE} />;
  }

  const passwordResetProps: SetPasswordProps = { oobCode, apiKey };

  return (
    <div>
      {(() => {
        switch (mode) {
          case "resetPassword":
            if (firstTime === "true") {
              return (
                <SetPassword
                  oobCode={passwordResetProps.oobCode}
                  apiKey={passwordResetProps.apiKey}
                />
              );
            }
            return <div> RESET PASSWORD </div>; // TODO: replace this with relevant component when completed
          case "recoverEmail":
            return <div> RECOVER EMAIL</div>; // TODO: replace this with relevant component when completed
          case "verifyEmail":
            return <div> VERIFY EMAIL</div>; // TODO: replace this with relevant component when completed
          default:
            return null;
        }
      })()}
    </div>
  );
};

export default AuthActions;
