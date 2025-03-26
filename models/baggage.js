'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Baggage extends Model {
    static associate(models) {
        //a baggage belongs to a passenger (one-to-one)
        this.belongsTo(models.Passenger, {
            foreignKey: "passenger_id",
            as: "passenger"
        });
    }
  }
  
  Baggage.init({
    baggage_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    //association with passenger
    passenger_id: {
      type: DataTypes.UUID, 
      references: {
        model: "Passenger", 
        key: "passenger_id" 
      },
      onDelete: "RESTRICT"
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName:'Baggage',
    tableName:'baggage',
    timestamps: true
  });

  return Baggage;

}
