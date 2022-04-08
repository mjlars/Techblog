// imports
const { Model, DataTypes } = require('sequelize');
const sqlz = require('../cfg/connection');

// define post model
class Postmodel extends Model {}

Postmodel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'usermodel',
                key: 'id'
            }
        },
        created_at: {
            type: DataTypes.DATE,
        }
    },
    {
        sqlz,
        freezeTableName: true,
        underscored: true,
        modelName: 'postmodel'
    }
);

module.exports = Postmodel;