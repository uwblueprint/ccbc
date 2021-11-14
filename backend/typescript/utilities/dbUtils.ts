import { SequelizeOptions } from "sequelize-typescript";

export const dbURL =
  process.env.DATABASE_URL ||
  `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.DB_HOST}:5432/${process.env.POSTGRES_DB}`;

export const SQLOptions = (
  modelPath: string[],
  testdb: boolean,
): SequelizeOptions => {
  return process.env.DATABASE_URL
    ? {
        dialect: "postgres",
        protocol: "postgres",
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
        models: modelPath,
        ...(testdb && { logging: false }), // https://stackoverflow.com/questions/11704267/in-javascript-how-to-conditionally-add-a-member-to-an-object
      }
    : {
        models: modelPath,
        ...(testdb && { logging: false }),
      };
};
