'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('PassengerFlight', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      passenger_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'passengers', // References the passengers table
          key: 'passenger_id',
        },
        onDelete: 'RESTRICT',
      },
      flight_number: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'flights', // References the flights table
          key: 'flight_number',
        },
        onDelete: 'RESTRICT',
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PassengerFlight');
  },
};