import { Seeder } from "../umzug";

const seedUsers = [
  {
    id: 1,
    auth_id: "fasdfsad",
    role_type: "Admin",
    first_name: "Shrinjay",
    last_name: "Mukherjee",
    email: "shrinjaymukherjee@gmail.com",
    createdAt: new Date(1636226732806),
    updatedAt: new Date(1636226732806),
  },
];

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.query("TRUNCATE TABLE users CASCADE");
  await sequelize.getQueryInterface().bulkInsert("users", seedUsers);
};
export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .bulkDelete("users", { id: seedUsers.map((u) => u.id) });
};
