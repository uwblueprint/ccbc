module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("creator", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "books",
          key: "id",
        },
      },
      location: {
        type: Sequelize.STRING,
      },
      rate: {
        type: Sequelize.FLOAT,
      },
      genre: {
        type: Sequelize.STRING,
      },
      age_group: {
        type: Sequelize.STRING,
      },
      timezone: {
        type: Sequelize.STRING,
      },
      bio: {
        type: Sequelize.STRING,
      },
      is_approved: {
        type: Sequelize.BOOLEAN,
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
  async down(queryInterface) {
    await queryInterface.dropTable("creator");
  },
};
