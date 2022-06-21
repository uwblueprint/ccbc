module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          "users",
          "subscription_expires_on",
          {
            type: Sequelize.DataTypes.STRING,
          },
          { transaction: t },
        ),
        queryInterface.removeColumn("users", "active", { transaction: t }),
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
            type: Sequelize.DataTypes.boolean,
          },
          { transaction: t },
        ),
      ]);
    });
  },
};
