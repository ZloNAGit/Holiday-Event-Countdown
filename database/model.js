const { db, DataTypes } = require('./index.js');

const Holidays = db.define('holidays', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  holidayName: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  holidayDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  theme: {
    type: DataTypes.TEXT
  }
});

module.exports = {
  // Get Holidays

  // Add Holiday

  // Remove Holiday
}