'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('detalle_flights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      flightNumber: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'flights',
          key: 'flight_number'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      passengerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Passengers',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      seatNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      class: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fare: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('detalle_flights');
  }
};
