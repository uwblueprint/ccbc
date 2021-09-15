import { resolve } from "path";

import { Sequelize } from "sequelize-typescript";


/* eslint-disable-next-line import/prefer-default-export */
export const testSql = new Sequelize(
  `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.DB_TEST_HOST}:5432/${process.env.POSTGRES_DB}`,
  { models: [resolve(__dirname, "../models/*.model.ts")], logging: false },
);
