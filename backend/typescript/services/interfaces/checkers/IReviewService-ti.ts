/**
 * This module was automatically generated by `ts-interface-builder`
 */
import * as t from "ts-interface-checker";
// tslint:disable:object-literal-key-quotes

export const Author = t.iface([], {
  fullName: "string",
  displayName: t.opt(t.union("string", "null")),
  attribution: t.opt(t.union("string", "null")),
});

export const Publisher = t.iface([], {
  fullName: "string",
  publishYear: "number",
});

export const Format = t.iface([], {
  format: "string",
  price: "string",
  isbn: "string",
});

export const Book = t.iface([], {
  title: "string",
  coverImage: "string",
  titlePrefix: t.opt(t.union("string", "null")),
  seriesOrder: t.opt(t.union("string", "null")),
  illustrator: t.opt(t.union(t.array("string"), "null")),
  translator: t.opt(t.union(t.array("string"), "null")),
  formats: t.union(t.array("Format"), "null"),
  minAge: "number",
  maxAge: "number",
  authors: t.array("Author"),
  publishers: t.array("Publisher"),
  seriesName: t.opt(t.union("string", "null")),
});

export const Tag = t.iface([], {
  name: "string",
});

export const ReviewRequestDTO = t.iface([], {
  body: "string",
  byline: "string",
  featured: "boolean",
  publishedAt: t.opt(t.union("number", "null")),
  books: t.array("Book"),
  tags: t.array("Tag"),
});

export const ReviewResponseDTO = t.iface([], {
  reviewId: "number",
  body: "string",
  byline: "string",
  featured: "boolean",
  books: t.array("Book"),
  tags: t.array("Tag"),
  updatedAt: "number",
  publishedAt: t.union("number", "null"),
  createdAt: "number",
});

export const IReviewService = t.iface([], {
  createReview: t.func(
    "ReviewResponseDTO",
    t.param("entity", "ReviewRequestDTO"),
  ),
});

const exportedTypeSuite: t.ITypeSuite = {
  Author,
  Publisher,
  Format,
  Book,
  Tag,
  ReviewRequestDTO,
  ReviewResponseDTO,
  IReviewService,
};
export default exportedTypeSuite;