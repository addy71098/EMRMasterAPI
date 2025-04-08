const { Sequelize } = require('sequelize');
require('dotenv').config();
var connection=null;
function establishConnection(){
    console.log(`DB Creds: ${process.env.DB_NAME} / ${process.env.DB_USER} / ${process.env.DB_PASSWORD}`);
    
    return new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false // Only use false if your cert is self-signed
          }
        }
      });
}
function terminateConnection(connection){
    connection.close();
}
function getConnection(){
  if(connection==null){
    connection=establishConnection();
  }
  return connection;
}
module.exports = {establishConnection, terminateConnection, getConnection}