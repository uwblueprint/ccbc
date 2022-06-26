/* eslint-disable */
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.createTable('genres', {
        name: {
          type: Sequelize.STRING,
          primaryKey: true,
          unique: true,
        },
      }, { transaction: t });
      await queryInterface.createTable('book_genre', {
        genre_name: {
          type: Sequelize.STRING,
          primaryKey: true,
          references: {
            model: 'genres',
            key: 'name',
          }
        },
        book_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'books',
            key: 'id',
          }
        }
      }, { transaction: t });
      return Promise.resolve(); 
    })
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.dropTable(
        'book_genre',
        { transaction: t }
      );
      await queryInterface.dropTable(
        'genres',
        { transaction: t }
      );
      return Promise.resolve();
    })
  },
};
