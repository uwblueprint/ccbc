import * as path from "path";
import { Umzug, SequelizeStorage } from "umzug";
import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { dbURL, SQLOptions } from "./utilities/dbUtils";

const sequelizeOptions: SequelizeOptions = SQLOptions(
  [path.join(__dirname, "/*.pgmodel.{ts,js}")],
  false,
);

export const sequelize = new Sequelize(dbURL, sequelizeOptions);

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

export const seeder = new Umzug({
  migrations: {
    glob: ["seeders/*.ts", { cwd: __dirname }],
  },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize,
    modelName: "seeder_meta",
  }),
  logger: console,
});

export type Seeder = typeof seeder._types.migration;
