import * as firebaseAdmin from "firebase-admin";
import User from "../../models/user.model";
import { AuthDTO, Role, Token, UserDTO } from "../../types";

interface IAuthService {
  /**
   * Generate a short-lived JWT access token and a long-lived refresh token
   * when supplied user's email and password
   * @param email user's email
   * @param password user's password
   * @returns AuthDTO object containing the access token, refresh token, and user info
   * @throws Error if token generation fails
   */
  generateToken(email: string, password: string): Promise<AuthDTO>;

  /**
   * Generate a short-lived JWT access token and a long-lived refresh token
   * when supplied OAuth ID token
   * @param idToken user's ID token
   * @returns AuthDTO object containing the access token, refresh token, and user info
   * @throws Error if token generation fails
   */
  generateTokenOAuth(idToken: string): Promise<AuthDTO>;

  /**
   * Revoke all refresh tokens of a user
   * @param userId userId of user whose refresh tokens are to be revoked
   * @throws Error if token revocation fails
   */
  revokeTokens(userId: string): Promise<void>;

  /**
   * Generate new access and refresh token pair using the provided refresh token
   * @param refreshToken refresh token
   * @returns Token object containing new access and refresh tokens
   * @throws Error if token renewal fails
   */
  renewToken(refreshToken: string): Promise<Token>;

  /**
   * Generate a password reset link for the user with the given email and send
   * the link to that email address
   * @param email email of user requesting password reset
   * @throws Error if unable to generate link or send email
   */
  resetPassword(email: string): Promise<void>;

  /**
   * Generate an email verification link for the user with the given email and send
   * the link to that email address
   * @param email email of user that needs to be verified
   * @throws Error if unable to generate link or send email
   */
  sendEmailVerificationLink(email: string): Promise<void>;

  /**
   * Sends an email to the created user with their login details and a
   * link to change their password
   * @param user the UserDTO that has user information
   * @param accessCode the access code the user has to use to set up their password
   * @param isNewAccount a flag determining if set up is for new account or forgot password
   */
  sendPasswordSetupLink(
    user: UserDTO,
    accessCode: string,
    isNewAccount: boolean,
  ): Promise<void>;

  /**
   * Determine if the provided access token is valid and authorized for at least
   * one of the specified roles
   * @param accessToken user's access token
   * @param roles roles to check for
   * @returns true if token valid and authorized, false otherwise
   */
  isAuthorizedByRole(accessToken: string, roles: Set<Role>): Promise<boolean>;

  /**
   * Gets user by the access token
   * @param accessToken
   * @returns User if user with acess token is found, null otherwise
   */
  getUserByAccessToken(accessToken: string): Promise<User | null>;

  /**
   * Determine if the provided access token is valid and issued to the requested user
   * @param accessToken user's access token
   * @param requestedUserId userId of requested user
   * @returns true if token valid and authorized, false otherwise
   */
  isAuthorizedByUserId(
    accessToken: string,
    requestedUserId: string,
  ): Promise<boolean>;

  /**
   * Determine if the provided access token is valid and issued to the requested user
   * with the specified email address
   * @param accessToken user's access token
   * @param requestedEmail email address of requested user
   * @returns true if token valid and authorized, false otherwise
   */
  isAuthorizedByEmail(
    accessToken: string,
    requestedEmail: string,
  ): Promise<boolean>;

  /**
   * returns the firebase user record given the userId
   * @param uid user's id on firebase
   * @returns a firebase UserRecord representing the user on firebase auth
   * @throws Error if user retrieval fails
   */
  getFirebaseUserByUid(uid: string): Promise<firebaseAdmin.auth.UserRecord>;

  /**
   * returns the uid for the firebase user given the email
   * @param email the user's email
   * @returns the user's uid associated with their firebase account
   * @throws Error if can't get the user's uid
   */
  getFirebaseUserIdByEmail(email: string): Promise<string>;

  /**
   * verifies the user with the uid account
   * @param uid user's id on firebase
   * @returns void
   * @throws Error if user can't be verified
   */
  markVerified(uid: string): Promise<void>;

  /**
   * Used when the user has forgotten their password. This sets their password to a random access code
   * @param email the user's email associated with their account
   * @returns the temporary password (aka: accessCode) set to the user's account
   * @throws Error if unable to set the password
   */
  setTemporaryUserPassword(email: string): Promise<string>;
}

export default IAuthService;
