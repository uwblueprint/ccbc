export type BookFormat = {
  format: string;
  price: string;
  isbn: string;
};

export type Author = {
  fullName: string;
  displayName: string;
  attribution: string;
};

export type Publisher = {
  fullName: string;
  publishYear: number;
};

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
