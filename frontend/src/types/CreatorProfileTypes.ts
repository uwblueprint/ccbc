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
  | "bibliography";

export type BibliographyEntry = {
  title: string;
  publisher: string;
  publicationYear: number;
  additionalNotes?: string;
};
