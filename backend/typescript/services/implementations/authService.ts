import * as firebaseAdmin from "firebase-admin";
import randomPasswordGenerator from "secure-random-password";

import IAuthService from "../interfaces/authService";
import IEmailService from "../interfaces/emailService";
import IUserService from "../interfaces/userService";
import { AuthDTO, Role, Token, UserDTO } from "../../types";
import FirebaseRestClient from "../../utilities/firebaseRestClient";
import logger from "../../utilities/logger";
import { getErrorMessage } from "../../utilities/errorResponse";
import User from "../../models/user.model";

const Logger = logger(__filename);

class AuthService implements IAuthService {
  userService: IUserService;

  emailService: IEmailService | null;

  constructor(
    userService: IUserService,
    emailService: IEmailService | null = null,
  ) {
    this.userService = userService;
    this.emailService = emailService;
  }

  async generateToken(email: string, password: string): Promise<AuthDTO> {
    try {
      const token = await FirebaseRestClient.signInWithPassword(
        email,
        password,
      );
      const user = await this.userService.getUserByEmail(email);
      return { ...token, ...user };
    } catch (error) {
      Logger.error(`Failed to generate token for user with email ${email}`);
      throw error;
    }
  }

  async generateTokenOAuth(idToken: string): Promise<AuthDTO> {
    try {
      const googleUser = await FirebaseRestClient.signInWithGoogleOAuth(
        idToken,
      );
      // googleUser.idToken refers to the Firebase Auth access token for the user
      const token = {
        accessToken: googleUser.idToken,
        refreshToken: googleUser.refreshToken,
      };
      // If user already has a login with this email, just return the token
      try {
        // Note: an error message will be logged from UserService if this lookup fails.
        // You may want to silence the logger for this special OAuth user lookup case
        const user = await this.userService.getUserByEmail(googleUser.email);
        return { ...token, ...user };
        /* eslint-disable no-empty */
      } catch (error) { }

      const user = await this.userService.createUser(
        {
          firstName: googleUser.firstName,
          lastName: googleUser.lastName,
          email: googleUser.email,
          roleType: "Admin", // TODO: pass in the role as a parameter to function for author and subscriber
          subscriptionExpiresOn: null,
          password: "",
        },
        googleUser.localId,
        "GOOGLE",
      );

      return { ...token, ...user };
    } catch (error) {
      Logger.error(`Failed to generate token for user with OAuth ID token`);
      throw error;
    }
  }

  async revokeTokens(userId: string): Promise<void> {
    try {
      const authId = await this.userService.getAuthIdById(userId);

      await firebaseAdmin.auth().revokeRefreshTokens(authId);
    } catch (error: unknown) {
      const errorMessage = [
        "Failed to revoke refresh tokens of user with id",
        `${userId}.`,
        "Reason =",
        getErrorMessage(error),
      ];
      Logger.error(errorMessage.join(" "));

      throw error;
    }
  }

  /* eslint-disable class-methods-use-this */
  async renewToken(refreshToken: string): Promise<Token> {
    try {
      const ret = await FirebaseRestClient.refreshToken(refreshToken);
      const user = await this.getUserByAccessToken(ret.accessToken);

      if (user && user.subscription_expires_on) {
        const currentDate = new Date();
        currentDate.setUTCHours(0, 0, 0, 0);
        const subscriptionExpireDate = new Date(user.subscription_expires_on);
        subscriptionExpireDate.setUTCHours(0, 0, 0, 0);

        if (currentDate.getTime() > subscriptionExpireDate.getTime()) {
          await this.revokeTokens(user.id);
          return { accessToken: "", refreshToken: "" };
        }
      }

      return ret;
    } catch (error) {
      Logger.error("Failed to refresh token");
      throw error;
    }
  }

  async resetPassword(email: string): Promise<void> {
    if (!this.emailService) {
      const errorMessage =
        "Attempted to call resetPassword but this instance of AuthService does not have an EmailService instance";
      Logger.error(errorMessage);
      throw new Error(errorMessage);
    }

    try {
      const resetLink = await firebaseAdmin
        .auth()
        .generatePasswordResetLink(email);

      // first-time determines if we are setting a new account password
      // (account will be verified) or reseting an old account's password
      const resetPasswordLink = resetLink.concat("&first-time=false");

      const emailBody = `
      Hello,
      <br><br>
      We have received a password reset request for your account.
      Please click the following link to reset it.
      <strong>This link is only valid for 1 hour.</strong>
      <br><br>
      <a href=${resetPasswordLink}>Reset Password</a>`;

      this.emailService.sendEmail(email, "Your Password Reset Link", emailBody);
    } catch (error) {
      Logger.error(
        `Failed to generate password reset link for user with email ${email}`,
      );
      throw error;
    }
  }

  async sendEmailVerificationLink(email: string): Promise<void> {
    if (!this.emailService) {
      const errorMessage =
        "Attempted to call sendEmailVerificationLink but this instance of AuthService does not have an EmailService instance";
      Logger.error(errorMessage);
      throw new Error(errorMessage);
    }

    try {
      const emailVerificationLink = await firebaseAdmin
        .auth()
        .generateEmailVerificationLink(email);
      const emailBody = `
      Hello,
      <br><br>
      Please click the following link to verify your email and activate your account.
      <strong>This link is only valid for 1 hour.</strong>
      <br><br>
      <a href=${emailVerificationLink}>Verify email</a>`;

      this.emailService.sendEmail(email, "Verify your email", emailBody);
    } catch (error) {
      Logger.error(
        `Failed to generate email verification link for user with email ${email}`,
      );
      throw error;
    }
  }

  async sendPasswordSetupLink(
    user: UserDTO,
    accessCode: string,
    isNewAccount: boolean,
  ): Promise<void> {
    if (!this.emailService) {
      const errorMessage =
        "Attempted to call sendPasswordSetupLink but this instance of AuthService does not have an EmailService instance";
      Logger.error(errorMessage);
      throw new Error(errorMessage);
    }

    try {
      const authId = await this.userService.getAuthIdById(user.id);

      const setPasswordLink = `${process.env.CLIENT_URL}/auth/action?mode=verify-user&uid=${authId}&new-account=${isNewAccount}`;

      const emailBody = isNewAccount
        ? `Hello,
      <br><br>
      You have been invited to join CCBC as a ${user.roleType.toLowerCase()}. Please click on the link 
      below to verify your account and set your new password. 
      <br>Your unique access code is ${accessCode}.
      <br><br>
      <a href=${setPasswordLink}>Setup Account</a>`
        : `Hello ${user.firstName}!
      <br><br>
      Please click on the link below to set your new password.
      <br>Your unique access code is ${accessCode}.
      <br><br>
      <a href=${setPasswordLink}>Reset Password</a>`;

      this.emailService.sendEmail(
        user.email,
        isNewAccount ? "Verify your CCBC Account" : "CCBC: Reset your password",
        emailBody,
      );
    } catch (error) {
      Logger.error(
        `Failed to send password set up link for user with email ${user.email}`,
      );
      throw error;
    }
  }

  async isAuthorizedByRole(
    accessToken: string,
    roles: Set<Role>,
  ): Promise<boolean> {
    try {
      const decodedIdToken: firebaseAdmin.auth.DecodedIdToken =
        await firebaseAdmin.auth().verifyIdToken(accessToken, true);
      const userRole = await this.userService.getUserRoleByAuthId(
        decodedIdToken.uid,
      );

      const firebaseUser = await firebaseAdmin
        .auth()
        .getUser(decodedIdToken.uid);

      return firebaseUser.emailVerified && roles.has(userRole);
    } catch (error) {
      return false;
    }
  }

  async getUserByAccessToken(accessToken: string): Promise<User | null> {
    try {
      const decodedIdToken: firebaseAdmin.auth.DecodedIdToken =
        await firebaseAdmin.auth().verifyIdToken(accessToken, true);
      const user = await this.userService.getUserbyAuthID(
        decodedIdToken.user_id,
      );
      return user;
    } catch (error) {
      Logger.error(`Failed to get user. Reason = ${getErrorMessage(error)}`);
      throw error;
    }
  }

  async isAuthorizedByUserId(
    accessToken: string,
    requestedUserId: string,
  ): Promise<boolean> {
    try {
      const decodedIdToken: firebaseAdmin.auth.DecodedIdToken =
        await firebaseAdmin.auth().verifyIdToken(accessToken, true);
      const tokenUserId = await this.userService.getUserIdByAuthId(
        decodedIdToken.uid,
      );

      const firebaseUser = await firebaseAdmin
        .auth()
        .getUser(decodedIdToken.uid);

      return (
        firebaseUser.emailVerified && String(tokenUserId) === requestedUserId
      );
    } catch (error) {
      return false;
    }
  }

  async isAuthorizedByEmail(
    accessToken: string,
    requestedEmail: string,
  ): Promise<boolean> {
    try {
      const decodedIdToken: firebaseAdmin.auth.DecodedIdToken =
        await firebaseAdmin.auth().verifyIdToken(accessToken, true);

      const firebaseUser = await firebaseAdmin
        .auth()
        .getUser(decodedIdToken.uid);

      return (
        firebaseUser.emailVerified && decodedIdToken.email === requestedEmail
      );
    } catch (error) {
      return false;
    }
  }

  /**
   * getFirebaseUserByUid returns the firebaseUser that has the passed in uid
   * @param uid A string represeting the user id in Firebase
   * @returns UserRecord representing the firebase user with the given uid
   */
  async getFirebaseUserByUid(
    uid: string,
  ): Promise<firebaseAdmin.auth.UserRecord> {
    let firebaseUser: firebaseAdmin.auth.UserRecord;
    try {
      firebaseUser = await firebaseAdmin.auth().getUser(uid);
      if (!firebaseUser) throw new Error(`No user found with uid: ${uid}`);
      return firebaseUser;
    } catch (error: unknown) {
      Logger.error(
        `Failed to get firebase user by uid: ${uid}. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
  }

  /**
   * returns the uid for the firebase user given the email
   * @param email the user's email
   * @returns the user's uid associated with their firebase account
   * @throws Error if can't get the user's uid
   */
  async getFirebaseUserIdByEmail(email: string): Promise<string> {
    const firebaseUser = await firebaseAdmin.auth().getUserByEmail(email);
    if (!firebaseUser) throw Error("No firebaseuser found with that email");
    return firebaseUser.uid;
  }

  /**
   * Sets the firebase user with the given uid to be verified
   * @param uid the user id of the user inside Firebase
   */
  async markVerified(uid: string): Promise<void> {
    try {
      await firebaseAdmin.auth().updateUser(uid, {
        emailVerified: true,
      });
    } catch (error: unknown) {
      Logger.error(
        `Failed to verify firebase user by uid: ${uid}. Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
  }

  /**
   * Used when the user has forgotten their password. This sets their password to a random access code
   * @param email the user's email associated with their account
   * @returns the temporary password (aka: accessCode) set to the user's account
   * @throws Error if unable to set the password
   */
  async setTemporaryUserPassword(uid: string): Promise<string> {
    const accessCode = randomPasswordGenerator.randomPassword({
      length: 8, // length of the password
      characters: [
        // acceptable characters in the password
        randomPasswordGenerator.lower,
        randomPasswordGenerator.upper,
        randomPasswordGenerator.digits,
      ],
    });

    await firebaseAdmin.auth().updateUser(uid, {
      password: accessCode,
    });

    return accessCode;
  }

  async createUserAndSendRegistrationEmail(
    firstName: string,
    lastName: string,
    email: string,
    roleType: Role,
    subscriptionExpiresOn: Date | null,
  ): Promise<AuthDTO> {
    const accessCode = randomPasswordGenerator.randomPassword({
      length: 8, // length of the password
      characters: [
        // acceptable characters in the password
        randomPasswordGenerator.lower,
        randomPasswordGenerator.upper,
        randomPasswordGenerator.digits,
      ],
    });

    let createdUser: UserDTO | null = null;
    try {
      createdUser = await this.userService.createUser({
        firstName,
        lastName,
        email,
        roleType,
        subscriptionExpiresOn,
        password: accessCode,
      });

      // try to sign in the user and return the expiring token
      const authDTO = await this.generateToken(email, accessCode);

      // Send email with login details and ask to change password
      // once they change the password, user should be verified
      await this.sendPasswordSetupLink(createdUser, accessCode, true);

      return authDTO;
    } catch (error) {
      if (createdUser != null) {
        // rollback created user if we could not log them in
        await this.userService.deleteUserByEmail(createdUser.email);
      }
      Logger.error(
        `Failed to register user Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }
}

export default AuthService;
