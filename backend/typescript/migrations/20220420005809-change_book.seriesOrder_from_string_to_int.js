/* eslint-disable */
"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn("books", "series_order", {
        type: 'INTEGER USING CAST("series_order" as INTEGER)',
        // allowNull: true
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn("books", "series_order", {
        type: 'VARCHAR USING CAST("series_order" as VARCHAR)',
        // allowNull: true
      }),
    ]);
  },
};
