import { Seeder } from "../umzug";

const seedBookAuthors = [
  {
    author_id: 2,
    book_id: 1,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    author_id: 3,
    book_id: 1,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    author_id: 1,
    book_id: 2,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    author_id: 1,
    book_id: 3,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    author_id: 1,
    book_id: 4,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    author_id: 4,
    book_id: 5,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    author_id: 4,
    book_id: 6,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    author_id: 4,
    book_id: 7,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    author_id: 4,
    book_id: 8,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    author_id: 4,
    book_id: 9,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    author_id: 4,
    book_id: 10,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    author_id: 4,
    book_id: 11,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    author_id: 5,
    book_id: 12,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    author_id: 5,
    book_id: 13,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
];

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .bulkInsert("book_author", seedBookAuthors);
};

export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkDelete("book_author", {
    book_id: seedBookAuthors.map((u) => u.book_id),
  });
};
