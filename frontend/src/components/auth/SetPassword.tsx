import { initializeApp } from "firebase/app";
import { getAuth, verifyPasswordResetCode } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

import authAPIClient from "../../APIClients/AuthAPIClient";
import { HOME_PAGE } from "../../constants/Routes";
import AuthContext from "../../contexts/AuthContext";
import { AuthenticatedUser } from "../../types/AuthTypes";

export type SetPasswordProps = {
  oobCode: string;
  apiKey: string;
};

const SetPassword = ({
  oobCode,
  apiKey,
}: SetPasswordProps): React.ReactElement => {
  const config = { apiKey };

  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [firebaseAuth] = useState(getAuth(initializeApp(config)));
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // verify the oobCode and set the email
    async function verifyPasswordCode() {
      verifyPasswordResetCode(firebaseAuth, oobCode)
        .then((email) => {
          setUserEmail(email);
        })
        .catch(() => {
          return null; // TODO: Show error on the screen
        });
    }
    verifyPasswordCode();
  }, [firebaseAuth, oobCode]);

  const onSetPasswordClick = async () => {
    if (newPassword !== confirmNewPassword) {
      // TODO: handle user fields verification
    } else {
      const user: AuthenticatedUser = await authAPIClient.setPassword(
        userEmail,
        newPassword,
        firebaseAuth,
        oobCode,
      );
      setAuthenticatedUser(user);
    }
  };

  if (authenticatedUser) {
    return <Redirect to={HOME_PAGE} />;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Set Password</h1>
      <form>
        <div>
          <input
            type="text"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            placeholder="New Password"
          />
        </div>
        <div>
          <input
            type="text"
            value={confirmNewPassword}
            onChange={(event) => setConfirmNewPassword(event.target.value)}
            placeholder="Confirm Password"
          />
        </div>
        <div>
          <button
            className="btn btn-primary"
            type="button"
            onClick={onSetPasswordClick}
          >
            Set Password
          </button>
        </div>
      </form>
    </div>
  );
};

export { SetPassword };
