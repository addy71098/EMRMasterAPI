const { DataTypes } = require('sequelize');
const { getConnection } = require('../connection/connect');
const sequelize = getConnection();

const ForgotPass = sequelize.define('ForgotPass',{
    username:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    otp:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdat:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, {
    tableName: 'forgotpass',     // Explicitly tell Sequelize the table name
    timestamps: false,          // Since your table doesn't have Sequelize's default timestamps
    freezeTableName: true       // Prevent Sequelize from pluralizing table name
  })
  module.exports = ForgotPass;