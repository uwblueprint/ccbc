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
  createdBy: number;
  publishedAt?: number | null;
  books: BookRequest[];
  tags: Tag[];
};

export type ReviewResponse = {
  reviewId: number;
  body: string;
  byline: string;
  featured: boolean;
  createdBy: number;
  books: BookResponse[];
  tags: Tag[];
  updatedAt: number;
  publishedAt: number | null;
  createdAt: number;
};
