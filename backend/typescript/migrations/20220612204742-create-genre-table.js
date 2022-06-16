/* eslint-disable */
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable('genres', {
        name: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          primaryKey: true,
          unique: true,
        }
      });
      await queryInterface.createTable('book_genre', {
        genre_name: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          references: {
            model: 'genres',
            key: 'name',
          }
        },
        book_id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
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
      queryInterface.dropTable("book_genre"),
    ]);
  },
};
