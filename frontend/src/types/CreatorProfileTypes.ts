export type CreatorProfile = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  offeredLocations?: string;
  preferredGradeLevel?: string;
  preferredAudienceSize?: string;
  inPersonDeliveryFee?: string;
  virtualDeliveryFree?: string;
  equipmentRequired?: string;
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
  | "equipmentRequired";
