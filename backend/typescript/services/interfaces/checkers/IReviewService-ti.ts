/**
 * This module was automatically generated by `ts-interface-builder`
 */
import * as t from "ts-interface-checker";
// tslint:disable:object-literal-key-quotes

export const AuthorRequest = t.iface([], {
  id: t.opt("number"),
  fullName: "string",
  displayName: t.opt(t.union("string", "null")),
  attribution: t.opt(t.union("string", "null")),
});

export const AuthorResponse = t.iface([], {
  id: "number",
  fullName: "string",
  displayName: t.union("string", "null"),
  attribution: t.union("string", "null"),
});

export const PublisherRequest = t.iface([], {
  id: t.opt("number"),
  fullName: "string",
  publishYear: "number",
});

export const PublisherResponse = t.iface([], {
  id: "number",
  fullName: "string",
  publishYear: "number",
});

export const Genre = t.iface([], {
  name: "string",
});

export const Format = t.iface([], {
  format: "string",
  price: "number",
  isbn: "string",
});

export const Series = t.iface([], {
  id: t.opt("number"),
  name: t.opt(t.union("string", "null")),
});

export const BookRequest = t.iface([], {
  id: t.opt("number"),
  title: "string",
  coverImage: "string",
  titlePrefix: t.opt(t.union("string", "null")),
  seriesOrder: t.opt(t.union("number", "null")),
  illustrator: t.opt(t.union(t.array("string"), "null")),
  translator: t.opt(t.union(t.array("string"), "null")),
  formats: t.union(t.array("Format"), "null"),
  minAge: "number",
  maxAge: "number",
  genres: t.array("Genre"),
  authors: t.array("AuthorRequest"),
  publishers: t.array("PublisherRequest"),
  series: "Series",
});

export const BookResponse = t.iface([], {
  id: "number",
  title: "string",
  coverImage: "string",
  titlePrefix: t.union("string", "null"),
  seriesOrder: t.union("number", "null"),
  illustrator: t.union(t.array("string"), "null"),
  translator: t.union(t.array("string"), "null"),
  formats: t.union(t.array("Format"), "null"),
  minAge: "number",
  maxAge: "number",
  genres: t.array("Genre"),
  authors: t.array("AuthorResponse"),
  publishers: t.array("PublisherResponse"),
  series: "Series",
});

export const TagRequest = t.iface([], {
  id: t.opt("number"),
  name: "string",
});

export const TagResponse = t.iface([], {
  id: "number",
  name: "string",
});

export const User = t.iface([], {
  id: "number",
  firstName: "string",
  lastName: "string",
});

export const ReviewRequestDTO = t.iface([], {
  body: "string",
  byline: "string",
  featured: "boolean",
  createdBy: "number",
  publishedAt: t.opt(t.union("number", "null")),
  books: t.array("BookRequest"),
});

export const ReviewResponseDTO = t.iface([], {
  reviewId: "number",
  body: "string",
  byline: "string",
  featured: "boolean",
  createdBy: t.opt(t.union("number", "null")),
  createdByUser: t.opt(t.union("User", "null")),
  books: t.array("BookResponse"),
  updatedAt: "number",
  publishedAt: t.union("number", "null"),
  createdAt: "number",
});

export const IReviewService = t.iface([], {
  createReview: t.func(
    "ReviewResponseDTO",
    t.param("review", "ReviewRequestDTO"),
  ),
  getReview: t.func("ReviewResponseDTO", t.param("id", "string")),
  getReviews: t.func(t.array("ReviewResponseDTO")),
  updateReviews: t.func(
    "void",
    t.param("id", "string"),
    t.param("review", "ReviewRequestDTO"),
  ),
  deleteReview: t.func("void", t.param("id", "string")),
});

const exportedTypeSuite: t.ITypeSuite = {
  AuthorRequest,
  AuthorResponse,
  PublisherRequest,
  PublisherResponse,
  Format,
  Series,
  BookRequest,
  BookResponse,
  TagRequest,
  TagResponse,
  Genre,
  User,
  ReviewRequestDTO,
  ReviewResponseDTO,
  IReviewService,
};
export default exportedTypeSuite;
