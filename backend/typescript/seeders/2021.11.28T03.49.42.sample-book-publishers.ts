import { Seeder } from "../umzug";

const seedBookPublishers = [
  {
    publisher_id: 1,
    book_id: 1,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    publisher_id: 1,
    book_id: 2,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    publisher_id: 1,
    book_id: 3,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    publisher_id: 1,
    book_id: 4,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
];

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .bulkInsert("book_publisher", seedBookPublishers);
};

export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkDelete("book_publisher", {
    book_id: seedBookPublishers.map((u) => u.book_id),
  });
};
