import {
  Auth,
  getAuth,
  signInWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

import authAPIClient from "../../APIClients/AuthAPIClient";
import { HOME_PAGE } from "../../constants/Routes";
import AuthContext from "../../contexts/AuthContext";
import { AuthenticatedUser } from "../../types/AuthTypes";
import firebaseApp from "../../utils/firebase";

export type SetPasswordProps = {
  email: string;
  uid: string;
};

const SetPassword = ({ email, uid }: SetPasswordProps): React.ReactElement => {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [userEmail, setUserEmail] = useState(email);
  const [accessCode, setAccessCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const onSetPasswordClick = async () => {
    if (newPassword !== confirmNewPassword) {
      // TODO: handle user fields verification
    } else {
      try {
        const auth = getAuth(firebaseApp);

        // update the password for the loggedin user
        const { currentUser } = auth;
        if (currentUser === null)
          throw new Error("Unable to retreive current user");
        await updatePassword(currentUser, newPassword);

        // verify the user
        const couldVerify = await authAPIClient.verifyEmail(uid);
        if (!couldVerify) {
          throw new Error("Could not verify user");
        }

        // log the user in if password reset was successful
        const user: AuthenticatedUser = await authAPIClient.login(
          userEmail,
          newPassword,
        );
        if (!user) {
          throw Error("Could not log in user");
        }
        setAuthenticatedUser(user);
      } catch (error) {
        if (error instanceof Error) setErrorMessage(error.message);
      }
    }
  };

  if (authenticatedUser) {
    return <Redirect to={HOME_PAGE} />;
  }

  const verifiedPage = <div>User already set up. Link has expired</div>;

  const unverifiedPage = (
    <div style={{ textAlign: "center" }}>
      <h1>Set Password</h1>
      <div>
        <div>
          <input
            type="text"
            value={accessCode}
            onChange={(event) => setAccessCode(event.target.value)}
            placeholder="Access Code"
          />
        </div>
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
      </div>
      <div color="red">{errorMessage}</div>
    </div>
  );

  return isVerified ? verifiedPage : unverifiedPage;
};

export { SetPassword };
