// /* eslint-disable */ 
// 'use strict';

// module.exports = {
//   up: (queryInterface, Sequelize) => {
//     return queryInterface.createTable('test', {
//       name: Sequelize.DataTypes.STRING,
//     });
//   },
//   down: (queryInterface, Sequelize) => {
//     return queryInterface.dropTable('test');
//   }
// };
import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
    up: (queryInterface: QueryInterface): Promise<void> => {
      return queryInterface.createTable("test", {
        id: {
          type: DataTypes.INTEGER
        }
      });
    },

    down: (queryInterface: QueryInterface): Promise<void> => {
      return queryInterface.dropTable("test");
    }
};
