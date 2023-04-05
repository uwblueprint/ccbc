import { Presentation } from "./CreatorTypes";

export type CreatorProfile = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  bibliography?: BibliographyEntry[];
  bookCovers?: BookCoverFile[];
  geographicReach?: string;
  primaryTimezone?: string;
  availability?: string[];
  crafts?: string[];
  genres?: string[];
  presentations?: Presentation[];
  website?: string;
  bio?: string;
  profilePictureLink?: string;
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
  | "profilePictureLink";

export type BibliographyEntry = {
  title: string;
  publisher: string;
  publicationYear: number;
  additionalNotes?: string;
};

export type BookCoverFile = {
  url: string;
  name: string;
  fileSize: number;
};