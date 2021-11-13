import { initializeApp } from "firebase/app";
import { getAuth, verifyPasswordResetCode } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";

import authAPIClient from "../../APIClients/AuthAPIClient";
import { HOME_PAGE } from "../../constants/Routes";
import AuthContext from "../../contexts/AuthContext";
import { AuthenticatedUser } from "../../types/AuthTypes";

export type SetPasswordProps = {
  mode: string;
  oobCode: string;
  apiKey: string;
};

const SetPassword = ({
  mode,
  oobCode,
  apiKey,
}: SetPasswordProps): React.ReactElement => {
  const config = { apiKey };

  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [firebaseAuth, setFiresebaseAuth] = useState(
    getAuth(initializeApp(config)),
  );
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // verify the oobCode and set the email
    async function verifyPasswordCode() {
      verifyPasswordResetCode(firebaseAuth, oobCode)
        .then((email) => {
          setIsCodeVerified(true);
          setUserEmail(email);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    verifyPasswordCode();
  }, [firebaseAuth, oobCode]);

  const onSetPasswordClick = async () => {
    const user: AuthenticatedUser = await authAPIClient.setPassword(
      userEmail,
      newPassword,
      firebaseAuth,
      oobCode,
    );
    setAuthenticatedUser(user);
  };

  /* 
  if (authenticatedUser) {
    return <Redirect to={HOME_PAGE} />;
  } */

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Set Password</h1>
      <form>
        <div>
          <input
            type="text"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            placeholder="Current Password"
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
