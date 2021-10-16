import { DataType } from "sequelize-typescript";

import { Migration } from "../umzug";

export const up: Migration = async (queryInterface, Sequelize) => {
    await queryInterface.createTable('authors', {
        id: {
            allowNull: false,
            type: DataType.INTEGER,
            primaryKey: true
        },
        full_name: {
            allowNull: false,
            type: DataType.STRING
        },
        display_name: {
            allowNull: true,
            type: DataType.STRING
        }
    });
  };

export const down: Migration = async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('authors');
};
