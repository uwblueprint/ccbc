import { DataType } from "sequelize-typescript";

import { Migration } from "../umzug";

export const up: Migration = async (queryInterface, Sequelize) => {
    await queryInterface.createTable('book_authors', {
        author_id: {
            allowNull: false,
            type: DataType.INTEGER,
            references: {
                table: 'authors',
                field: 'id'
            }
        },
        book_id: {
            allowNull: false,
            type: DataType.INTEGER,
            references: {
                table: 'books',
                field: 'id'
            }
        },
    });
  };

export const down: Migration = async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('book_authors');
};
