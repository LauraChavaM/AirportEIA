'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Flight extends Model {
      static associate(models) {
        // A flight has many passengers but a passenger could have many flights (many-to-many)
        this.belongsToMany(models.Passenger, { 
            through: "PassengerFlight", // Junction table for many-to-many relationship
            foreignKey: "flight_number", // Foreign key in PassengerFlight for Flight
            otherKey: "passenger_id", // Foreign key in PassengerFlight for Passenger
            as: "passengers" // Alias for the association
        });
        //a flight has many personnel but a personnel has only one flight (one-to-many)
        this.hasMany(models.Personnel, { 
          foreignKey: "flight_number",
          as: "personnel"
        });
      }
    }

    Flight.init({
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
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Active"
        }
    }, {
        sequelize,
        modelName: 'Flight',
        tableName: 'flights',
        timestamps: true
    });

    return Flight;

}
