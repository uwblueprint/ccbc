module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("creator_bookings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      creatorId: {
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.STRING,
      },
      isTentative: {
        type: Sequelize.BOOLEAN,
      },
      isOneDay: {
        type: Sequelize.BOOLEAN,
      },
      ageGroup: {
        type: Sequelize.STRING,
      },
      audienceSize: {
        type: Sequelize.INTEGER,
      },
      subject: {
        type: Sequelize.STRING,
      },
      message: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("creator_bookings");
  },
};
