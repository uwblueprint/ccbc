/**
 * Type for the format of a book
 */
export type BookFormat = {
  format: string;
  price: number;
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
 * Type for tag of a book
 */
 export type Tag = {
  name: string;
};

/**
 * Type for genre of a book
 */
export type Genre = {
  name: string;
};

/**
 * For Genres, and Tags
 */
export type Option = {
  label: string;
  value: string;
};

/**
 * Type for a book
 */
export type Book = {
  title: string;
  coverImage: string;
  titlePrefix: string | null;
  seriesOrder: number | null;
  illustrator: string[];
  translator: string[] | null;
  formats: BookFormat[];
  minAge: number;
  maxAge: number;
  authors: Author[];
  publishers: Publisher[];
  tags: Tag[];
  genres: Genre[];
  seriesName: string | null;
};
