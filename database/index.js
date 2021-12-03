const { Sequelize, DataTypes } = require('sequelize');
const info = require('./config.js');

const sequelize = new Sequelize(info.db, info.username, info.password, {
  host: 'localhost',
  dialect: 'postgres'
})

module.exports = {
  db: sequelize,
  DataTypes: DataTypes
};