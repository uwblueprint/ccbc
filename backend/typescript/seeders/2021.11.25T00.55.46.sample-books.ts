import { Seeder } from "../umzug";

const seedBooks = [
  {
    id: 1,
    review_id: 1,
    title: "The Loudest Bark",
    illustrator: ["Amélie Ayotte"],
    // TODO: format and age range fields are left out until we can statically assign types to seed data
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    id: 2,
    review_id: 2,
    title: "Bloom",
    series_id: 1,
    series_order: "Book 1",
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    id: 3,
    review_id: 2,
    title: "Hatch",
    series_id: 1,
    series_order: "Book 2",
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    id: 4,
    review_id: 2,
    title: "Thrive",
    series_id: 1,
    series_order: "Book 3",
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
];

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkInsert("books", seedBooks, {}, []);
};

export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .bulkDelete("books", { id: seedBooks.map((u) => u.id) });
};
