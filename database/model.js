const { db, DataTypes } = require('./index.js');

const Holidays = db.define('holidays', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  holidayname: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  holidaydate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  theme: {
    type: DataTypes.TEXT
  }
});

module.exports = {
  getHolidays: () => {
    return Holidays.findAll()
  }

  // Add Holiday

  // Remove Holiday
}