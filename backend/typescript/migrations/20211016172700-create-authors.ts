import { DataType } from "sequelize-typescript";

import { Migration } from "../umzug";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable("authors", {
    id: {
      allowNull: false,
      type: DataType.INTEGER,
      primaryKey: true,
    },
    full_name: {
      allowNull: false,
      type: DataType.STRING,
    },
    display_name: {
      allowNull: true,
      type: DataType.STRING,
    },
    attribution: {
      allowNull: true,
      type: DataType.STRING,
    },
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable("authors");
};
