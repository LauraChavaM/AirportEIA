'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("flights", {
      flight_number: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      airline: {
        type: Sequelize.STRING,
        allowNull: false
      },
      origin: {
        type: Sequelize.STRING,
        allowNull: false
      },
      destination: {
        type: Sequelize.STRING,
        allowNull: false
      },
      departure_time: {
        type: Sequelize.DATE,
        allowNull: false
      },
      arrival_time: {
        type: Sequelize.DATE,
        allowNull: false
      },
      departure_gate: {
        type: Sequelize.STRING,
        allowNull: false
      },
      arrival_gate: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Active"
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("flights");
  }
};
