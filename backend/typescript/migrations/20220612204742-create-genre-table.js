/* eslint-disable */
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable('genres', {
        name: {
          type: Sequelize.STRING,
          primaryKey: true,
          unique: true,
        }
      });
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
          primaryKey: true,
          references: {
            model: 'books',
            key: 'id',
          }
        }
      });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.dropTable('genre'),
      queryInterface.dropTable("book_genre"),
    ]);
  },
};
