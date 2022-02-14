import { BEARER_TOKEN } from "../constants/AuthConstants";
import baseAPIClient from "./BaseAPIClient";

export type AuthorRequest = {
  fullName: string;
  displayName?: string | null;
  attribution?: string | null;
};

export type AuthorResponse = {
  fullName: string;
  displayName: string | null;
  attribution: string | null;
};

export type Publisher = {
  fullName: string;
  publishYear: number;
};

export type Format = {
  format: string;
  price: string;
  isbn: string;
};

export type BookRequest = {
  title: string;
  coverImage: string;
  titlePrefix?: string | null;
  seriesOrder?: string | null;
  illustrator?: string[] | null;
  translator?: string[] | null;
  formats: Format[] | null;
  minAge: number;
  maxAge: number;
  authors: AuthorRequest[];
  publishers: Publisher[];
  seriesName?: string | null;
};

export type BookResponse = {
  title: string;
  coverImage: string;
  titlePrefix: string | null;
  seriesOrder: string | null;
  illustrator: string[] | null;
  translator: string[] | null;
  formats: Format[] | null;
  minAge: number;
  maxAge: number;
  authors: AuthorResponse[];
  publishers: Publisher[];
  seriesName: string | null;
};

export type Tag = {
  name: string;
};

export type ReviewRequest = {
  body: string;
  byline: string;
  featured: boolean;
  // @TODO: uncomment when christine changes are merged
  // createdBy: number;
  publishedAt?: number | null;
  books: BookRequest[];
  tags: Tag[];
};

export type ReviewResponse = {
  reviewId: number;
  body: string;
  byline: string;
  featured: boolean;
  // @TODO: uncomment when christine changes are merged
  // createdBy: number;
  books: BookResponse[];
  tags: Tag[];
  updatedAt: number;
  publishedAt: number | null;
  createdAt: number;
};

const getReviews = async (): Promise<ReviewResponse[]> => {
  try {
    const { data } = await baseAPIClient.get("/reviews", {
      headers: { Authorization: BEARER_TOKEN },
    });
    return data;
  } catch (error) {
    return error as ReviewResponse[];
  }
};

export default getReviews;
