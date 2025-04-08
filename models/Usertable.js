const { DataTypes } = require('sequelize');
const { getConnection } = require('../connection/connect');
const sequelize = getConnection();

const UserTable = sequelize.define('UserTable', {
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  middlename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dlno: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dob: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pmobno: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cmobno: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  caddr: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paddr: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  visittime: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tcchk: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdat: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  password: {
    type: DataTypes.STRING,
  },
  twofactchk: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'usertable',     // Explicitly tell Sequelize the table name
  timestamps: false,          // Since your table doesn't have Sequelize's default timestamps
  freezeTableName: true       // Prevent Sequelize from pluralizing table name
});

module.exports = UserTable;
