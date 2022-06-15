/* eslint-disable */
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.createTable('genres', {
        name: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          references: {
            model: 'books',
            key: 'id',
            as: 'book_id',
          },
        }
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.dropTable("genres"),
    ]);
  },
};
