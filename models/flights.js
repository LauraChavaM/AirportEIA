// models/Flight.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Set up sequelize instance

const Flight = sequelize.define("Flight", {
  flight_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  departure_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  arrival_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  departure_gate: {
    type: DataTypes.STRING,
  },
  arrival_gate: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.ENUM("scheduled", "in progress", "delayed", "canceled"),
    allowNull: false
  },
  airline: {
    type: DataTypes.STRING
  },
  route: {
    type: DataTypes.STRING
  }
});

module.exports = Flight;
