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
  | "primaryTimezone";

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