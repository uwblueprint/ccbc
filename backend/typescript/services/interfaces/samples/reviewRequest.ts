import { ReviewRequestDTO } from "../IReviewService";

export default [
  {
    body: "Insert review body here",
    coverImages: ["cover Image 1", "Cover Image 2"],
    byline: "Insert Byline here",
    featured: true,
    publishedAt: 12445,
    books: [
      {
        title: "Book1 Title",
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
    ],
    tags: [{ name: "tag1 Name" }, { name: "tag2 Name" }],
  },
] as ReviewRequestDTO[];
