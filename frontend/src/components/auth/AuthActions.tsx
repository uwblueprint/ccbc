import React, { useContext, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";

import ResetPassword from "./ResetPassword";
import { SetPassword, SetPasswordProps } from "./SetPassword";

const AuthActions = (): React.ReactElement => {
  const { search } = useLocation();

  const searchParams = new URLSearchParams(search);
  const mode = searchParams.get("mode")!;
  const oobCode = searchParams.get("oobCode")!;
  const apiKey = searchParams.get("apiKey")!;
  const firstTime = searchParams.get("first-time");

  const passwordResetProps: SetPasswordProps = { mode, oobCode, apiKey };

  return (
    <div>
      {(() => {
        switch (mode) {
          case "resetPassword":
            if (firstTime === "true") {
              return (
                <SetPassword
                  mode={passwordResetProps.mode}
                  oobCode={passwordResetProps.oobCode}
                  apiKey={passwordResetProps.apiKey}
                />
              );
            }
            return <div> RESET PASSWORD </div>;
          case "recoverEmail":
            return <div> RECOVER EMAIL</div>;
          case "verifyEmail":
            return <div> VERIFY EMAIL</div>;
          default:
            return null;
        }
      })()}
    </div>
  );
};

export default AuthActions;
