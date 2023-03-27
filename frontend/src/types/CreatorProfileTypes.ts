import { Option } from "./BookTypes";

export type CreatorProfile = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  presentations?: Presentation[];
  bibliography?: BibliographyEntry[];
  bookCovers?: BookCoverFile[];
  geographicReach?: string;
  primaryTimezone?: string;
  availability?: string[];
  crafts?: string[];
  genres?: string[];
  presentationTypes?: string[];
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
  | "postalCode";

export type Presentation = {
  title: string;
  offeredLocations: Option[];
  preferredGradeLevel: Option[];
  preferredAudienceSize: string;
  inPersonDeliveryFee: string;
  virtualDeliveryFee: string;
  equipmentRequired: string;
  languages: string[];
  otherReadingLanguages: string;
  booksPurchasedAndAutoGraphed: string;
  contentOfReadings: string;
};

export type PresentationAttributes =
  | "title"
  | "offeredLocations"
  | "preferredGradeLevel"
  | "preferredAudienceSize"
  | "inPersonDeliveryFee"
  | "virtualDeliveryFee"
  | "equipmentRequired"
  | "languages"
  | "otherReadingLanguages"
  | "booksPurchasedAndAutoGraphed"
  | "contentOfReadings";
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
