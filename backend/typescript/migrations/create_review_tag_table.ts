import { DataType } from "sequelize-typescript";

import { Migration } from "../umzug";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable("review_tag", {
    review_id: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    tag_id: {
      type: DataType.INTEGER,
      allowNull: false,
    },
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable("review_tag");
};
