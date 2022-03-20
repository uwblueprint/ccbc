/* eslint-disable */ 
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('test', {
      name: Sequelize.DataTypes.STRING,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('test');
  }
};
