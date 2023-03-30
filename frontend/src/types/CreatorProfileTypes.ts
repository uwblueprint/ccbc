import { Presentation, Publication } from "./CreatorTypes";

export type CreatorProfile = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  streetAddress?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  publications?: Publication[];
  bookCovers?: BookCoverFile[];
  location?: string;
  timezone?: string;
  availability?: string[];
  craft?: string[];
  genre?: string[];
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
  | "streetAddress"
  | "city"
  | "province"
  | "postalCode"
  | "location"
  | "timezone"
  | "website"
  | "bio"
  | "profilePictureLink";

export type BibliographyEntry = {
  title: string;
  publisher: string;
  publication_year: number;
  notes?: string;
};

export type BookCoverFile = {
  url: string;
  name: string;
  fileSize: number;
};
