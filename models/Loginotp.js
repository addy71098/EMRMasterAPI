const { DataTypes } = require('sequelize');
const { getConnection } = require('../connection/connect');
const sequelize = getConnection();

const LoginOTP = sequelize.define('LoginOTP',{
    username:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    otp:{
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'loginotp',     // Explicitly tell Sequelize the table name
    timestamps: false,          // Since your table doesn't have Sequelize's default timestamps
    freezeTableName: true       // Prevent Sequelize from pluralizing table name
  })
  module.exports = LoginOTP;