const { DataTypes } = require('sequelize');
const { getConnection } = require('../connection/connect');
const sequelize = getConnection();

const TblMailOTP = sequelize.define('TblMailOTP',{
    entrycode:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    otp:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    requested_on: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    mailsenton: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
}, {
    tableName: 'tblemailotp',     // Explicitly tell Sequelize the table name
    timestamps: false,          // Since your table doesn't have Sequelize's default timestamps
    freezeTableName: true       // Prevent Sequelize from pluralizing table name
  })
  module.exports = TblMailOTP;