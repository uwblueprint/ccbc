module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.describeTable("users").then((tableDefinition) => {
          if (tableDefinition.subscription_expires_on) {
            return Promise.resolve();
          }
          return queryInterface.addColumn(
            "users",
            "subscription_expires_on",
            {
              type: Sequelize.DataTypes.DATE,
            },
            { transaction: t },
          );
        }),
        queryInterface.describeTable("users").then((tableDefinition) => {
          if (!tableDefinition.active) {
            return Promise.resolve();
          }
          return queryInterface.removeColumn("users", "active", {
            transaction: t,
          });
        }),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn("users", "subscription_expires_on", {
          transaction: t,
        }),
        queryInterface.addColumn(
          "users",
          "active",
          {
            type: Sequelize.DataTypes.BOOLEAN,
          },
          { transaction: t },
        ),
      ]);
    });
  },
};
