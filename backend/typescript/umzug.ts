import * as path from "path";
import { Umzug, SequelizeStorage } from "umzug";
import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { dbURL, SQLOptions } from "./utilities/dbUtils";

const sequelizeOptions: SequelizeOptions = SQLOptions(
  [path.join(__dirname, "/*.pgmodel.{ts,js}")],
  false,
);

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
