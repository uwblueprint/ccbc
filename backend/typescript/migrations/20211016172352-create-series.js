import { DataType } from "sequelize-typescript";

import { Migration } from "../umzug";

export const up: Migration = async (queryInterface, Sequelize) => {
    await queryInterface.createTable('series', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataType.INTEGER
        },
        name: {
            allowNull: false,
            type: DataType.STRING
        },
    });
  };

export const down: Migration = async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('series');
};
