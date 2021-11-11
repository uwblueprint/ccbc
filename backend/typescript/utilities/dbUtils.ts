import * as path from "path";
import { SequelizeOptions } from "sequelize-typescript";

export const dbURL =
  process.env.DATABASE_URL ||
  `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.DB_HOST}:5432/${process.env.POSTGRES_DB}`;

export const SQLOptions = (
  modelPath: string,
  testdb: boolean,
): SequelizeOptions => {
  const modelsPath: string[] = testdb
    ? [path.resolve(__dirname, "../models/*.model.ts")]
    : [path.join(__dirname, modelPath)];

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
        models: modelsPath,
        logging: !testdb,
      }
    : {
        models: modelsPath,
        logging: !testdb,
      };
};
