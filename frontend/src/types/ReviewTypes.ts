import { Book, Genre, Tag } from "./BookTypes";

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
  price: number;
  isbn: string;
};

export interface Series {
  id?: number;
  name?: string | null;
}

export type BookRequest = {
  title: string;
  coverImage: string;
  titlePrefix?: string | null;
  seriesOrder?: number;
  illustrator?: string[] | null;
  translator?: string[] | null;
  formats: Format[] | null;
  minAge: number;
  maxAge: number;
  authors: AuthorRequest[];
  tags: Tag[];
  genres: Genre[];
  publishers: Publisher[];
  series?: Series;
};

export type BookResponse = {
  id: number;
  title: string;
  coverImage: string;
  titlePrefix: string | null;
  seriesOrder: number;
  illustrator: string[] | null;
  translator: string[] | null;
  formats: Format[] | null;
  minAge: number;
  maxAge: number;
  authors: AuthorResponse[];
  tags: Tag[];
  genres: Genre[];
  publishers: Publisher[];
  series: Series;
};

export type ReviewRequest = {
  body: string;
  byline: string;
  featured: boolean;
  createdBy: number;
  publishedAt?: number | null;
  books: BookRequest[];
};

export type PaginatedReviewResponse = {
  totalReviews: number;
  totalPages: number;
  currentPage: number;
  reviews: ReviewResponse[];
};

export type ReviewResponse = {
  reviewId: number;
  body: string;
  byline: string;
  featured: boolean;
  createdByUser: {
    id: number;
    firstName: string;
    lastName: string;
  };
  books: BookResponse[];
  updatedAt: number;
  publishedAt: number | null;
  createdAt: number;
};

export type Review = {
  reviewId: number; // this is necessary for deleting reviews
  body: string;
  byline: string;
  featured: boolean;
  createdByUser: {
    firstName: string;
    lastName: string;
  };
  books: Book[];
  updatedAt: number;
  publishedAt: number | null;
  createdAt: number;
};
