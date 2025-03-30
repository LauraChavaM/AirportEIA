'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("baggage", {

      baggage_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      //association with passenger
      passenger_id: {
        type: Sequelize.UUID,
        references: {
          model: "passengers",
          key: "passenger_id"
        },
        onDelete: "RESTRICT"
      },
      status: {
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
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("baggage");
  }
};
