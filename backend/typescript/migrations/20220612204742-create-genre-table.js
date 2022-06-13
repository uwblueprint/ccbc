/* eslint-disable */
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('Genre', {
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      }
    })
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("Genre");
  },
};
