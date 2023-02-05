export type CreatorProfile = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  province?: string;
  postalCode?: string;
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

export interface Creator {
  id: number;
  user_id: number;
  location: string;
  rate: number;
  genre: string;
  age_range: string;
  timezone: string;
  bio: string;
  isApproved: boolean;
  createdAt: number;
  updatedAt: number;
}
