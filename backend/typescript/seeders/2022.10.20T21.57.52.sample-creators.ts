import { Seeder } from "../umzug";

const seedCreators = [
  {
    id: 1,
    user_id: 1,
    location: "Canada",
    rate: 4.6,
    genre: "Mystery",
    age_group: "Teenager",
    timezone: "EDT",
    bio: "A mysterious author who writes detective stories to unravel great conspiracies",
    isApproved: true,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    id: 2,
    user_id: 1,
    location: "USA",
    rate: 2.3,
    genre: "Horror",
    age_group: "Children",
    timezone: "EDT",
    bio: "A proactive author using books to teach youngsters about the horrors in the real world like those found in abandoned ghost towns",
    isApproved: false,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
];

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.query("TRUNCATE TABLE creator CASCADE");
  await sequelize.getQueryInterface().bulkInsert("creator", seedCreators);
};

export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .bulkDelete("creator", { id: seedCreators.map((u) => u.id) });
};
