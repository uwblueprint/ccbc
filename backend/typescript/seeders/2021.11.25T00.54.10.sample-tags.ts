import { Seeder } from "../umzug";

const seedTags = [
  {
    id: 1,
    name: "Funny",
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    id: 2,
    name: "Fiction",
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    id: 3,
    name: "Horror",
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    id: 4,
    name: "Picture Book",
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
];

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.query("TRUNCATE TABLE tags CASCADE");
  await sequelize.getQueryInterface().bulkInsert("tags", seedTags);
};

export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .bulkDelete("tags", { id: seedTags.map((u) => u.id) });
};
