'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("flights", {
      flight_number: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      airline: {
        type: DataTypes.STRING,
        allowNull: false
      },
      origin: {
        type: DataTypes.STRING,
        allowNull: false
      },
      destination: {
        type: DataTypes.STRING,
        allowNull: false
      },
      departure_time: {
        type: DataTypes.DATE,
        allowNull: false
      },
      arrival_time: {
        type: DataTypes.DATE,
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false
      },
      departure_gate: {
        type: DataTypes.STRING,
        allowNull: false
      },
      arrival_gate: {
        type: DataTypes.STRING,
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
      }
    })
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("flights");
  }
};
