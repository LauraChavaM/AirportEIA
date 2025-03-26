'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Personnel extends Model {
      static associate(models) {
        // A flight has many personnel but a personnel has only one flight (one-to-many)
        this.belongsTo(models.Flight, {
          foreignKey: "flight_number",
          as: "flight"
        });
      }
    }
    
    Personnel.init({

        personnel_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contact: {
            type: DataTypes.STRING
        },
        flight_number: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'flights', 
                key: 'flight_number',
            },
            onDelete: 'RESTRICT',
        },
    }, {
        sequelize,
        modelName: 'Personnel',
        tableName: 'personnel',
        timestamps: true
    });
    return Personnel;
    
};

