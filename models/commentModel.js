// imports
const { Model, DataTypes } = require('sequelize');
const sqlz = require('../cfg/connection');

// define the comment model
class Commentmodel extends Model {}

Commentmodel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'usermodel',
                key: 'id'
            }
        },
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'postmodel',
                key: 'id'
            }
        },
        created_at: {
            type: DataTypes.DATE
        }
    },
    {
        sqlz,
        freezeTableName: true,
        underscored: true,
        modelName: 'commentmodel'
    }
);

module.exports = Commentmodel;