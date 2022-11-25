import { Seeder } from "../umzug";

const seedGenres = [
  {
    name: "Fantasy",
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    name: "Mystery",
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    name: "Horror",
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    name: "Science Fiction",
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
];

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.query("TRUNCATE TABLE genres CASCADE");
  await sequelize.getQueryInterface().bulkInsert("genres", seedGenres);
};

export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .bulkDelete("genres", { name: seedGenres.map((u) => u.name) });
};
