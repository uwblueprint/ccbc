import { UserRole } from "../constants/Enums";

export type AuthenticatedUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roleType: UserRole;
  active: boolean;
  accessToken: string;
  subscriptionExpiresOn: Date;
} | null;

export type DecodedJWT =
  | string
  | null
  | { [key: string]: unknown; exp: number };
