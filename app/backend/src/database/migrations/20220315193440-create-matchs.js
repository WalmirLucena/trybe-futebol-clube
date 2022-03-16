'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matchs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      home_team: {
        type: Sequelize.NUMBER,
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "clubs",
          key: "id",
        }
      },
      home_team_goals: {
        type: Sequelize.NUMBER,
        allowNull: false
      },
      away_team: {
        type: Sequelize.NUMBER,
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "clubs",
          key: "id",
        }
      },
      away_team_goals: {
        type: Sequelize.NUMBER,
        allowNull: false
      },
      in_progress: {
        type: Sequelize.NUMBER,
        allowNull: false
      },
      });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matchs');
  }
};