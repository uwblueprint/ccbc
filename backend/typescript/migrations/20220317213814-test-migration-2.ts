'use strict';

module.exports = {
  up: (queryInterface:any, Sequelize:any) => {
    return queryInterface.createTable('test', {
      name: Sequelize.DataTypes.STRING,
    });
  },
  down: (queryInterface:any, Sequelize:any) => {
    return queryInterface.dropTable('test');
  }
};

