import { Book } from "../../../types/BookTypes";
import { Review } from "../../../types/ReviewTypes";

const mockGenericBookData: Book = {
  title: "The Cat in the Hat",
  coverImage:
    "https://images-na.ssl-images-amazon.com/images/I/81drfTT9ZfL.jpg",
  titlePrefix: null,
  seriesOrder: 0,
  illustrator: ["Dr. Seuss"],
  translator: null,
  formats: [],
  minAge: 5,
  maxAge: 12,
  authors: [
    { fullName: "Theodor Geisel", displayName: "Dr. Seuss", attribution: null },
  ],
  publishers: [{ fullName: "Random House", publishYear: 1957 }],
  seriesName: null,
  tags: [],
  genres: [],
};
const mockLongTitleBookData: Book = {
  title:
    "A really really long book title that keeps on going and going and going like is there a cap on this????",
  coverImage:
    "https://upload.wikimedia.org/wikipedia/en/thumb/5/51/Spy_Family_vol_1.jpg/220px-Spy_Family_vol_1.jpg",
  titlePrefix: null,
  seriesOrder: 0,
  illustrator: ["Mangaka"],
  translator: null,
  formats: [],
  minAge: 5,
  maxAge: 12,
  authors: [
    { fullName: "Tina", displayName: "Tina Turner", attribution: null },
    { fullName: "Yuki", displayName: "Yuki Kaname", attribution: null },
    { fullName: "Yor", displayName: "Yor Forger", attribution: null },
    { fullName: "Joe", displayName: "Joe Hisaishi", attribution: null },
    { fullName: "Loid", displayName: "Loid Forger", attribution: null },
  ],
  publishers: [{ fullName: "Random House", publishYear: 1957 }],
  seriesName: null,
  tags: [],
  genres: [],
};

const hp1: Book = {
  title: "Philosopher's Stone",
  coverImage:
    "https://embed.cdn.pais.scholastic.com/v1/channels/sso/products/identifiers/isbn/9780590353403/primary/renditions/700",
  titlePrefix: null,
  seriesOrder: 1,
  illustrator: [],
  translator: null,
  formats: [],
  minAge: 5,
  maxAge: 12,
  authors: [
    {
      fullName: "Justina Kevin Rowling",
      displayName: "JK Rowling",
      attribution: null,
    },
    {
      fullName: "Hermione",
      displayName: "Hermione Granger",
      attribution: null,
    },
    {
      fullName: "Ron Weasley",
      displayName: "Ron Weasleyr",
      attribution: null,
    },
  ],
  publishers: [{ fullName: "Random House", publishYear: 1957 }],
  seriesName: "Harry Potter",
  tags: [
    {
      name: "Magic",
    },
    {
      name: "Monster",
    },
  ],
  genres: [
    {
      name: "Fantasy",
    },
  ],
};

const hp2: Book = {
  title: "Prisoner of Azkaban",
  coverImage:
    "https://upload.wikimedia.org/wikipedia/en/a/a0/Harry_Potter_and_the_Prisoner_of_Azkaban.jpg",
  titlePrefix: null,
  seriesOrder: 3,
  illustrator: [],
  translator: null,
  formats: [],
  minAge: 5,
  maxAge: 12,
  authors: [
    {
      fullName: "Justina Kevin Rowling",
      displayName: "JK Rowling",
      attribution: null,
    },
    {
      fullName: "Dumbledore",
      displayName: "Albus Dumbledore",
      attribution: null,
    },
  ],
  publishers: [{ fullName: "Random House", publishYear: 1957 }],
  seriesName: "Harry Potter",
  tags: [
    {
      name: "Magic",
    },
    {
      name: "Monster",
    },
  ],
  genres: [
    {
      name: "Fantasy",
    },
  ],
};

const mockSingleBookReview: Review = {
  reviewId: 10,
  body: "body of review",
  byline: "byline",
  featured: true,
  createdByUser: {
    firstName: "jessie",
    lastName: "peng",
  },
  books: [mockGenericBookData],
  updatedAt: 12,
  publishedAt: 2017111111212,
  createdAt: 14,
};

const mockSingleBookLongTitleReview: Review = {
  reviewId: 11,
  body: "body of review",
  byline: "byline",
  featured: true,
  createdByUser: {
    firstName: "jessie",
    lastName: "peng",
  },
  books: [mockLongTitleBookData],
  updatedAt: 12,
  publishedAt: 2017111111332,
  createdAt: 14,
};

const mockMultipleBookReview: Review = {
  reviewId: 11,
  body: "body of review",
  byline: "byline",
  featured: true,
  createdByUser: {
    firstName: "jessie",
    lastName: "peng",
  },
  books: [hp1, hp2, hp1, hp2],
  updatedAt: 12,
  publishedAt: 20171111212,
  createdAt: 14,
};

const mockMultipleBookReviews2: Review = {
  reviewId: 12,
  body: "body of review",
  byline: "byline",
  featured: true,
  createdByUser: {
    firstName: "jessie",
    lastName: "peng",
  },
  books: [mockGenericBookData, mockLongTitleBookData],
  updatedAt: 12,
  publishedAt: 20171111333,
  createdAt: 14,
};

const mockReviews: Review[] = [
  mockSingleBookReview,
  mockMultipleBookReview,
  mockSingleBookLongTitleReview,
  mockSingleBookReview,
  mockMultipleBookReview,
  mockSingleBookLongTitleReview,
  mockSingleBookReview,
  mockMultipleBookReviews2,
  mockSingleBookReview,
  mockMultipleBookReview,
  mockSingleBookLongTitleReview,
];

export default mockReviews;
