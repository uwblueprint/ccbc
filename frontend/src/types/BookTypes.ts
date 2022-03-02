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
  displayName: string;
  attribution: string;
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
  titlePrefix: string;
  seriesOrder: string;
  illustrator: string[];
  translator: string[];
  formats: BookFormat[];
  minAge: number;
  maxAge: number;
  authors: Author[];
  publishers: Publisher[];
  seriesName: string;
};
