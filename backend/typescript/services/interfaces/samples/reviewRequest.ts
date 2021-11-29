import { ReviewRequestDTO } from "../IReviewService";

export default [
  {
    body: "Insert review body here",
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
        seriesName: "Book1 Series Name",
      },
      {
        title: "Book2 Title",
        coverImage: "Book2 cover Image",
        titlePrefix: "Book2 Title Prefix",
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
        seriesName: "Book2 Series Name",
      },
    ],
    tags: [{ name: "tag1 Name" }, { name: "tag2 Name" }],
  },
  {
    body: "Insert review body here",
    byline: "Insert Byline here",
    featured: true,
    publishedAt: 12445,
    books: [
      {
        title: "Book1 Title",
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
          },
        ],
        publishers: [
          {
            fullName: "Insert Publisher Full Name",
            publishYear: 2002,
          },
        ],
      },
    ],
    tags: [{ name: "tag1 Name" }, { name: "tag2 Name" }],
  },
] as ReviewRequestDTO[];
