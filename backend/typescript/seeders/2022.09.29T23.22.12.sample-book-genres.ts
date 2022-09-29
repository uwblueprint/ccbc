import { Seeder } from "../umzug";

const seedGenres = [
  {
    book_id: 1,
    genre_name: "Fantasy",
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    book_id: 2,
    genre_name: "Mystery",
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    book_id: 3,
    genre_name: "Horror",
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    book_id: 4,
    genre_name: "Science Fiction",
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    book_id: 5,
    genre_name: "Fantasy",
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    book_id: 6,
    genre_name: "Mystery",
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    book_id: 7,
    genre_name: "Horror",
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    book_id: 8,
    genre_name: "Science Fiction",
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    book_id: 9,
    genre_name: "Fantasy",
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    book_id: 10,
    genre_name: "Mystery",
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    book_id: 11,
    genre_name: "Horror",
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    book_id: 12,
    genre_name: "Science Fiction",
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    book_id: 13,
    genre_name: "Fantasy",
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
];

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.query("TRUNCATE TABLE book_genre CASCADE");
  await sequelize.getQueryInterface().bulkInsert("book_genre", seedGenres);
};

export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .bulkDelete("book_genre", { book_id: seedGenres.map((u) => u.book_id) });
};
