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
  offeredLocations?: Option[];
  preferredGradeLevel?: Option[];
  preferredAudienceSize?: string;
  inPersonDeliveryFee?: string;
  virtualDeliveryFee?: string;
  equipmentRequired?: string;
  languages?: [string];
  otherReadingLanguages?: string;
  booksPurchasedAndAutoGraphed?: string;
  contentOfReadings?: string;
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
