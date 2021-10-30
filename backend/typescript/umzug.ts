import * as path from "path";

import { Umzug, SequelizeStorage } from "umzug";
import { Sequelize } from "sequelize-typescript";

const dbURL =
  process.env.DATABASE_URL ||
  `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.DB_HOST}:5432/${process.env.POSTGRES_DB}`;

const sequelize = new Sequelize(dbURL, {
  models: [path.join(__dirname, "/*.pgmodel.ts")],
});

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
