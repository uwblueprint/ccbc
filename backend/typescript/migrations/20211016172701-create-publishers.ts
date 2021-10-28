import { DataType } from "sequelize-typescript";

import { Migration } from "../umzug";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable("publishers", {
    id: {
      allowNull: false,
      type: DataType.INTEGER,
      primaryKey: true,
    },
    full_name: {
      allowNull: false,
      type: DataType.STRING,
    },
    publish_date: {
      allowNull: false,
      type: DataType.DATE,
    },
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable("publishers");
};
