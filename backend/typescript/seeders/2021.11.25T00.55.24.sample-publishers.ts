import { Seeder } from "../umzug";

const seedPublishers = [
  {
    id: 1,
    full_name: "Rebel Mountain Press",
    publish_year: 2021,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    id: 2,
    full_name: "HarperCollins Canada",
    publish_year: 2020,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
];

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.query("TRUNCATE TABLE publishers CASCADE");
  await sequelize.getQueryInterface().bulkInsert("publishers", seedPublishers);
};

export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .bulkDelete("publishers", { id: seedPublishers.map((u) => u.id) });
};
