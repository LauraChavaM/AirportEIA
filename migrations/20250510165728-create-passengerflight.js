'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PassengerFlight', {
      passenger_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'passengers',
          key: 'passenger_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      flight_number: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'flights',
          key: 'flight_number'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PassengerFlight');
  }
};
