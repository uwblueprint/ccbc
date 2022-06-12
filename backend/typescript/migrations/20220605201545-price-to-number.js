/* eslint-disable */
'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // return Promise.all([
    //   Sequelize.define([
    //     'require',
    //     'dependency'
    //   ], function(require, factory) {
    //     return JSON.parse(this.getData);
        
    //   });
    // ])
    // return Promise.all([
    //   queryInterface.changeColumn(
    //       "books", 
    //       "formats", {
        
    //     type: Sequelize.where(Sequelize.function('JSON_VALUE', sequelize.col('price'), ''))//Sequelize.JSON,
    //   }),
    //   // await queryinterface.sequelize.query()
    // ]);
},

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
