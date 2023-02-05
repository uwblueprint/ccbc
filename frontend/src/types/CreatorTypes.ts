/**
 * Type for Creator, a special class of user
 */
export type Creator = {
  userId: number;
  genre?: string;
  grade_level?: string;
  timezone?: string;
  bio?: string;
  isApproved?: boolean;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  street_address?: string;
  city?: string;
  province?: string;
  postal_code?: string;
  craft?: string;
  website?: string;
  profile_picture_link?: string;
  availability?: string;
  book_covers?: string[];
  isReadyForReview?: boolean;
  presentations?: Presentation[];
  publications?: Publication[];
} | null;

/**
 * Type for Presentation
 */
export type Presentation = {
  name?: string;
  locations?: string;
  age_groups?: string;
  audience_size?: string;
  is_in_person?: boolean;
  in_person_rate?: number;
  is_virtual?: boolean;
  virtual_rate?: number;
  special_equipment?: string;
  languages?: string;
  is_bringing?: boolean;
  details?: string;
  photos?: string;
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
