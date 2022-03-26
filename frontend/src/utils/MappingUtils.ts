import { Author, Book, BookFormat } from "../types/BookTypes";
import {
  AuthorResponse,
  BookRequest,
  BookResponse,
  Format,
} from "../types/ReviewTypes";

/**
 * This function maps a list of AuthorResponse objects to a list
 * of Author objects
 *
 * @param authorResponses - a list of AuthorResponse objects returned by the review API
 * @returns a list of Author objects
 */
export const mapAuthorResponseToAuthor = (
  authorResponses: AuthorResponse[],
): Author[] => {
  const result: Author[] = authorResponses.map((authorResponse) => ({
    fullName: authorResponse.fullName,
    displayName: authorResponse.displayName,
    attribution: authorResponse.attribution,
  }));

  return result;
};

/**
 * This function maps a list of Format objects to a list of
 * BookFormat objects
 *
 * @param formatResponse - a list of Format objects returned by the review API
 * @returns a list of BookFormat objects
 */
export const mapFormatToBookFormat = (
  formatResponse: Format[] | null,
): BookFormat[] => {
  if (!formatResponse) {
    return [];
  }

  const result: BookFormat[] = formatResponse.map((format) => ({
    format: format.format,
    price: format.price,
    isbn: format.isbn,
  }));

  return result;
};

/**
 *  This functions maps a list of BookResponse objects to a list of Book objects
 * @param books - a list of BookResponse objects returned by the review API
 * @returns  a list of Book objects
 */
export const mapBookResponeToBook = (books: BookResponse[]): Book[] => {
  const mappedBooks: Book[] = books.map((response) => ({
    title: response.title,
    coverImage: response.coverImage,
    titlePrefix: response.titlePrefix,
    seriesOrder: response.seriesOrder,
    illustrator: response.illustrator ? response.illustrator : [],
    translator: response.translator,
    formats: mapFormatToBookFormat(response.formats),
    minAge: response.minAge,
    maxAge: response.maxAge,
    authors: mapAuthorResponseToAuthor(response.authors),
    publishers: response.publishers,
    seriesName: response.series?.name || "",
  }));
  return mappedBooks;
};

/**
 * This function maps a list of Book objects to a list of BookRequest objects
 * @param books - a list of Book objects
 * @returns a list of BookRequest objects
 */
export const mapBookToBookRequest = (books: Book[]): BookRequest[] => {
  const mappedBookRequests: BookRequest[] = books.map((book) => ({
    title: book.title,
    coverImage: book.coverImage,
    titlePrefix: book.titlePrefix,
    seriesOrder: book.seriesOrder,
    illustrator: book.illustrator,
    translator: book.translator,
    formats: book.formats,
    minAge: book.minAge,
    maxAge: book.maxAge,
    authors: book.authors,
    publishers: book.publishers,
    series: {
      name: book.seriesName,
    },
  }));
  return mappedBookRequests;
};
