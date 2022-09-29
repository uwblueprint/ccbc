import { Seeder } from "../umzug";

const seedUsers = [
  {
    id: 1,
    auth_id: "tbnuBMTU3sNb2RExV0qqNXmqVN63",
    role_type: "Admin",
    first_name: "Shrinjay",
    last_name: "Mukherjee",
    email: "shrinjaymukherjee@uwblueprint.org",
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
];

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkInsert("users", seedUsers);
};

export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkDelete("users", {
    id: seedUsers.map((u) => u.id),
  });
};
