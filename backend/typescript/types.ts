import Publication from "./models/publication.model";

export type Role = "Admin" | "Subscriber" | "Author";

export type Token = {
  accessToken: string;
  refreshToken: string;
};

export interface Presentation {
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
  photos?: string[];
}

export interface Publication {
  title: string;
  publisher: string;
  publication_year: string;
  notes: string;
}

export type CreatorDTO = {
  id: number;
  userId: number;
  location: string;
  rate: number;
  genre: string[];
  ageRange: string;
  timezone: string;
  bio: string;
  isApproved: boolean;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  province: string;
  postalCode: string;
  craft: string[];
  website: string;
  profilePictureLink: string;
  availability: string[];
  bookCovers: string[];
  isReadyForReview: boolean;
  presentations: Presentation[];
  publications: Publication[];
};

export type CreatorCreateUpdateDTO = Omit<CreatorDTO, "isApproved">;

export type UserDTO = {
  id: string;
  roleType: Role;
  firstName: string;
  lastName: string;
  email: string;
  subscriptionExpiresOn: Date | null;
};

export type CreateUserDTO = Omit<UserDTO, "id"> & { password: string };

export type UpdateUserDTO = Omit<UserDTO, "id">;

export type RegisterUserDTO = Omit<CreateUserDTO, "role_type">;

export type AuthDTO = Token & UserDTO;

export type Letters = "A" | "B" | "C" | "D";

export type NodemailerConfig = {
  service: "gmail";
  auth: {
    type: "OAuth2";
    user?: string;
    clientId?: string;
    clientSecret?: string;
    refreshToken?: string;
  };
};

export type SignUpMethod = "PASSWORD" | "GOOGLE";

export type TagDTO = {
  name: string;
};

export type ReviewIds = {
  review_id: number;
};
