export type CreatorProfile = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  geographicReach?: string;
  primaryTimezone?: string;
  availability?: string[];
  crafts?: string[];
  genres?: string[];
  presentations?: string[];
  website?: string;
  bio?: string;
  profilePicUrl?: string;
} | null;

export type CreatorProfileProps =
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "address"
  | "city"
  | "province"
  | "postalCode"
  | "geographicReach"
  | "primaryTimezone"
  | "website"
  | "bio"
  | "profilePicUrl";
