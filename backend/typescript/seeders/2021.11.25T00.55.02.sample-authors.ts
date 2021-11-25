import { Seeder } from "../umzug";

const seedAuthors = [
  {
    id: 1,
    full_name: "Kenneth Oppel",
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    id: 2,
    full_name: "Second Author",
    display_name: "Second displayed name",
    attribution: "written and illustred by",
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
];

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkInsert("authors", seedAuthors);
};

export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .bulkDelete("authors", { id: seedAuthors.map((u) => u.id) });
};
