'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Service extends Model {
    static associate(models) {
      // no associations
    }
  }
  
  Service.init({
    service_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    location: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName:'Service',
    tableName:'service',
    timestamps: true
  });

  return Service;

}
