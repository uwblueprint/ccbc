import { Seeder } from "../umzug";

const seedBooks = [
  {
    id: 1,
    review_id: 1,
    title: "Bloom",
    series_id: 1,
    series_order: "Book 1",
    formats: [
      {
        format: "pb",
        price: "$50.00",
        isbn: "978-1-44-345031-7",
      },
      {
        format: "hc",
        price: "$50.00",
        isbn: "978-1-44-345031-7",
      },
    ],
    age_range: [4, 10],
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
];

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkInsert("books", seedBooks);
};

export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .bulkDelete("books", { id: seedBooks.map((u) => u.id) });
};
