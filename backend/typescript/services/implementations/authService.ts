import * as firebaseAdmin from "firebase-admin";

import IAuthService from "../interfaces/authService";
import IEmailService from "../interfaces/emailService";
import IUserService from "../interfaces/userService";
import { AuthDTO, Role, Token, UserDTO } from "../../types";
import FirebaseRestClient from "../../utilities/firebaseRestClient";
import logger from "../../utilities/logger";
import { getErrorMessage } from "../../utilities/errorResponse";

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
      } catch (error) {}

      const user = await this.userService.createUser(
        {
          firstName: googleUser.firstName,
          lastName: googleUser.lastName,
          email: googleUser.email,
          roleType: "Admin", // TODO: pass in the role as a parameter to function for author and subscriber
          active: true,
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
      return await FirebaseRestClient.refreshToken(refreshToken);
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

  async sendPasswordSetupLink(email: string, user: UserDTO): Promise<void> {
    if (!this.emailService) {
      const errorMessage =
        "Attempted to call sendPasswordSetupLink but this instance of AuthService does not have an EmailService instance";
      Logger.error(errorMessage);
      throw new Error(errorMessage);
    }

    try {
      const passwordResetLink = await firebaseAdmin
        .auth()
        .generatePasswordResetLink(email);
      // first-time determines if we are setting a new account password
      // (account will be verified) or reseting an old account's password
      const setPasswordLink = passwordResetLink.concat("&first-time=true");

      const emailBody = `
      Hello,
      <br><br>
      You have been invited to join CCBC as a ${user.roleType.toLowerCase()}. Please use the link 
      below to set your new password and verify your account. The link expires in 1 hour.
      <br><br>
      <a href=${setPasswordLink}>Set password and verify account</a>
      `;

      this.emailService.sendEmail(email, "CCBC Account Created", emailBody);
    } catch (error) {
      Logger.error(
        `Failed to send password set up link for user with email ${email}`,
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
}

export default AuthService;
