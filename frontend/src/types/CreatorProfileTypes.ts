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
