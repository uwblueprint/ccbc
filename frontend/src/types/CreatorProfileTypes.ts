import { Presentation, Publication } from "./CreatorTypes";

export type CreatorProfile = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  ageRange?: string;
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
  | "postalCode"
  | "location"
  | "timezone"
  | "website"
  | "bio"
  | "profilePictureLink"
  | "ageRange";

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

export type CreatorProfileFormProps = {
  currentPage: number;
};
