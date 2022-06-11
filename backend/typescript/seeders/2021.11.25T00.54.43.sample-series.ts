import { Seeder } from "../umzug";

const seedSeries = [
  {
    id: 1,
    name: "Bloom Trilogy",
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    id: 2,
    name: "Harry Potter",
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
];

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.query("TRUNCATE TABLE series CASCADE");
  await sequelize.getQueryInterface().bulkInsert("series", seedSeries);
};

export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .bulkDelete("series", { id: seedSeries.map((u) => u.id) });
};
