import { ReviewResponseDTO } from "../IReviewService";

// NOTE: for testing purposes, please name the "body" field of each object to be a unique integer in increasing order.
export default [
  {
    reviewId: 100,
    body: "1",
    byline: "Insert Byline here",
    featured: true,
    publishedAt: 12445,
    books: [
      {
        title: "Book1 Title",
        coverImage: "Book1 cover Image",
        titlePrefix: "Book1 Title Prefix",
        seriesOrder: "1",
        illustrator: ["illustrator1"],
        translator: ["translator1"],
        formats: [
          {
            format: "format1",
            price: "$15.0",
            isbn: "1234-5678-931",
          },
        ],
        minAge: 3,
        maxAge: 18,
        authors: [
          {
            fullName: "Insert Author Full Name",
            displayName: "Insert Author Display Name",
            attribution: "Insert Author Attribution",
          },
        ],
        publishers: [
          {
            fullName: "Insert Publisher Full Name",
            publishYear: 2002,
          },
        ],
        series: {
          name: "Book1 Series Name",
        },
      },
      {
        title: "Book2 Title",
        titlePrefix: "Book2 Title Prefix",
        coverImage: "Book2 cover Image",
        seriesOrder: "2",
        illustrator: ["illustrator1"],
        translator: ["translator1"],
        formats: [
          {
            format: "format1",
            price: "$15.0",
            isbn: "1234-5678-931",
          },
        ],
        minAge: 3,
        maxAge: 18,
        authors: [
          {
            fullName: "Insert Author Full Name",
            displayName: "Insert Author Display Name",
            attribution: "Insert Author Attribution",
          },
        ],
        publishers: [
          {
            fullName: "Insert Publisher Full Name",
            publishYear: 2002,
          },
        ],
        series: { name: "Book2 Series Name" },
      },
    ],
    tags: [{ name: "tag1 Name" }, { name: "tag2 Name" }],
  },
  {
    reviewId: 100,
    body: "2",
    byline: "Insert Byline here",
    featured: true,
    publishedAt: 12445,
    books: [
      {
        title: "Book1 Title",
        coverImage: "Book1 cover",
        titlePrefix: null,
        seriesOrder: null,
        illustrator: null,
        translator: null,
        formats: [
          {
            format: "format1",
            price: "$15.0",
            isbn: "1234-5678-931",
          },
        ],
        minAge: 3,
        maxAge: 18,
        authors: [
          {
            fullName: "Insert Author Full Name",
            displayName: null,
            attribution: null,
          },
        ],
        publishers: [
          {
            fullName: "Insert Publisher Full Name",
            publishYear: 2002,
          },
        ],
        series: {
          name: null,
        },
      },
    ],
    tags: [{ name: "tag1 Name" }, { name: "tag2 Name" }],
  },
] as ReviewResponseDTO[];
