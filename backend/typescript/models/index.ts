import * as path from "path";
import { Sequelize } from "sequelize-typescript";

const dbURL =
  process.env.DATABASE_URL ||
  `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.DB_HOST}:5432/${process.env.POSTGRES_DB}`;

const sequelize = new Sequelize(dbURL, {
  models: [path.join(__dirname, "/*.model.ts")],
});

export default sequelize;
