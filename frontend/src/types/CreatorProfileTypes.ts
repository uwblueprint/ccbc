import { Option } from "./BookTypes";
import { Publication } from "./CreatorTypes";

export type CreatorProfile = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  streetAddress?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  presentations?: Presentation[];
  bibliography?: BibliographyEntry[];
  publications?: Publication[];
  bookCovers?: BookCoverFile[];
  location?: string;
  timezone?: string;
  availability?: string[];
  craft?: string[];
  genre?: string[];
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
  | "contentOfReadings"
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
