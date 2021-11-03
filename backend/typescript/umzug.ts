import * as path from "path";

import { Umzug, SequelizeStorage } from "umzug";
import { Sequelize, SequelizeOptions } from "sequelize-typescript";

const dbURL =
  process.env.DATABASE_URL ||
  `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.DB_HOST}:5432/${process.env.POSTGRES_DB}`;

const sequelizeOptions: SequelizeOptions = process.env.DATABASE_URL
  ? {
      dialect: "postgres",
      protocol: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      models: [path.join(__dirname, "/*.pgmodel.ts")],
    }
  : {
      models: [path.join(__dirname, "/*.pgmodel.ts")],
    };

const sequelize = new Sequelize(dbURL, sequelizeOptions);

export const migrator = new Umzug({
  migrations: {
    glob: ["migrations/*.ts", { cwd: __dirname }],
  },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize,
  }),
  logger: console,
});

export type Migration = typeof migrator._types.migration;
