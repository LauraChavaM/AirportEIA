'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Passenger extends Model {
      static associate(models) {
        //one flight has many passengers but a passenger could have many flights (many-to-many)
        //each passenger has one baggage (one-to-one)
        this.belongsToMany(models.Flight, {
          through: "PassengerFlight", // Junction table for many-to-many relationship
          foreignKey: "passenger_id", // Foreign key in PassengerFlight for Passenger
          otherKey: "flight_number", // Foreign key in PassengerFlight for Flight
          as: "flights" // Alias for the association
        });
        this.hasOne(models.Baggage, {
          foreignKey: "passenger_id",
          as: "baggage"
        });
      }
    }
    
    Passenger.init({
            
            passenger_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            contact: {
                type: DataTypes.STRING
            },
           
        }, {
            sequelize,
            modelName: 'Passenger',
            tableName: 'Passenger',
            timestamps: true,
        });

    return Passenger;
}

