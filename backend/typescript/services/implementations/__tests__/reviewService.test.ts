import { snakeCase } from "lodash";

import Review from "../../../models/review.model";
import ReviewService from "../ReviewService";

import { ReviewRequestDTO } from "../../interfaces/IReviewService";

const testReviews = [
  {
    body: "review100",
    coverImages: ["cover1", "cover2"],
    byline: "byline1",
    featured: true,
    publishedAt: 12445,
    books: [
      {
        title: "title1",
        titlePrefix: "titlePrefix1",
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
        authors: [{ fullName: "author11" }],
        publishers: [
          {
            fullName: "publisher",
            publishYear: 2002,
          },
        ],
        seriesName: "seriesName",
      },
      {
        title: "title2",
        titlePrefix: "titlePrefix1",
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
        authors: [{ fullName: "author11" }],
        publishers: [
          {
            fullName: "publisher",
            publishYear: 2002,
          },
        ],
        seriesName: "seriesName",
      },
    ],
    tags: [{ name: "tag1" }, { name: "tag2" }],
    createdBy: 1,
  },
];

describe("pg reviewService", () => {
  let reviewService: ReviewService;

  beforeEach(() => {
    reviewService = new ReviewService();
  })
});
