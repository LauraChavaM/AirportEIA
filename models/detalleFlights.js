'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DetalleFlight extends Model {
    static associate(models) {
      // Definimos las asociaciones aquí
      this.belongsTo(models.Flight, {
        foreignKey: 'flightNumber',
        as: 'flight'
      });
      this.belongsTo(models.Passenger, {
        foreignKey: 'passengerId',
        as: 'passenger'
      });
    }
  }
  DetalleFlight.init({
    flightNumber: {
      type: DataTypes.UUID,
      references: {
        model: 'Flights',
        key: 'flight_number'
      }
    },
    passengerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Passengers',
        key: 'id'
      }
    },
    seatNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    class: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fare: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'DetalleFlight',
    tableName: 'detalle_flights',
    timestamps: true
  });
  return DetalleFlight;
};
