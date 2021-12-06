const { Sequelize, DataTypes } = require('sequelize');
const info = require('./config.js');

const sequelize = new Sequelize(info.db, info.username, info.password, {
  host: 'localhost',
  dialect: 'postgres',
  define: {
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'created_at', 'updated_at']
      }
    }
  },
  logging: false
})

module.exports = {
  db: sequelize,
  DataTypes: DataTypes
};