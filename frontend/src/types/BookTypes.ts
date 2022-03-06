/**
 * Type for the format of a book
 */
export type BookFormat = {
  format: string;
  price: string;
  isbn: string;
};

/**
 * Type for the author of a book
 */
export type Author = {
  fullName: string;
  displayName: string | null;
  attribution: string | null;
};

/**
 * Type for the publisher of a book
 */
export type Publisher = {
  fullName: string;
  publishYear: number;
};

/**
 * Type for a book
 */
export type Book = {
  title: string;
  coverImage: string;
  titlePrefix: string | null;
  seriesOrder: string | null;
  illustrator: string[] | null;
  translator: string[] | null;
  formats: BookFormat[];
  minAge: number;
  maxAge: number;
  authors: Author[];
  publishers: Publisher[];
  seriesName: string | null;
};
