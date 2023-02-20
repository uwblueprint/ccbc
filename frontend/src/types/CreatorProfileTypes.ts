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
  | "bibliography"
  | "geographicReach"
  | "primaryTimezone";

export type BibliographyEntry = {
  title: string;
  publisher: string;
  publicationYear: number;
  additionalNotes?: string;
};