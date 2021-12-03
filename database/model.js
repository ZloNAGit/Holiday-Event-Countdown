const { db, DataTypes } = require('./index.js');

const Holidays = db.define('holidays', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  theme: {
    type: DataTypes.TEXT
  }
})