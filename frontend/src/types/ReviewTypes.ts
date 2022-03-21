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

export interface Series {
  id?: number;
  name?: string | null;
}

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
  series?: Series;
};

export type BookResponse = {
  id: number;
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
  series: Series;
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
  createdByUser: {
    id: number;
    firstName: string;
    lastName: string;
  };
  books: BookResponse[];
  tags: Tag[];
  updatedAt: number;
  publishedAt: number | null;
  createdAt: number;
};
