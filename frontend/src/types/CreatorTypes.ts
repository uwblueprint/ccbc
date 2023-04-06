import { Option } from "./BookTypes";
/**
 * Type for Creator, a special class of user
 */
export type Creator = {
  id?: number;
  userId: number;
  genre?: string[];
  ageRange?: string;
  location?: string;
  timezone?: string;
  bio?: string;
  isApproved?: boolean;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  streetAddress?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  craft?: string[];
  website?: string;
  profilePictureLink?: string;
  availability?: string[];
  bookCovers?: string[];
  isReadyForReview?: boolean;
  presentations?: Presentation[];
  publications?: Publication[];
  createdAt?: number;
  updatedAt?: number;
};

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
/**
 * Type for Publication
 */
export type Publication = {
  title?: string;
  publisher?: string;
  publication_year?: string;
  notes?: string;
};

/**
 * Type for Creator requests
 */
export type CreatorRequest = {
  creatorId?: number;
  name?: string;
  email?: string;
  date?: string;
  isTentative?: boolean;
  isOneDay?: boolean;
  ageGroup?: string;
  audienceSize?: number;
  subject?: string;
  message?: string;
};

/**
 * Type for Creator Booking Requests
 */
export type CreatorBookingRequest = {
  creatorId?: number;
  name: string;
  email: string;
  date: string;
  isTentative: boolean;
  isOneDay: boolean;
  ageGroup: string;
  audienceSize: number;
  subject: string;
  message: string;
};
