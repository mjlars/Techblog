// imports
const { Model, DataTypes } = require('sequelize');
const sqlz = require('../cfg/connection');
const bcrypt = require('bcrypt');

// define the user model

class Usermodel extends Model {
    checkPW(LoginPassword) {
        return bcrypt.compareSync(LoginPassword, this.password);
    }
}

Usermodel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
            isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4]
            }
        }
    },
    {
        hooks: {
            async beforeCreate(newUser) {
                newUser.password = await bcrypt.hash(newUser.password, 10);
                return newUser;
            },
            async beforeUpdate(updatedUser) {
                updatedUser.password = await bcrypt.hash(updatedUser.password, 10);
                return updatedUser;
            }
        },
        sqlz,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'usermodel'
    }
);

module.exports = Usermodel;
