export type Author = {
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

export type Book = {
  title: string;
  coverImage: string;
  titlePrefix: string | null;
  seriesOrder: string | null;
  illustrator: string[] | null;
  translator: string[] | null;
  formats: Format[] | null;
  minAge: number;
  maxAge: number;
  authors: Author[];
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
  publishedAt: number | null;
  books: Book[];
  tags: Tag[];
};

export type ReviewResponse = {
  reviewId: number;
  body: string;
  byline: string;
  featured: boolean;
  // @TODO: uncomment when christine changes are merged
  // createdBy: number;
  books: Book[];
  tags: Tag[];
  updatedAt: number;
  publishedAt: number | null;
  createdAt: number;
};
