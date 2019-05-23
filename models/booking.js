'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    arrival_time: {
      type: DataTypes.DATEONLY,
      validate: {
        isAfter: {
          args: "2019-05-24",
          msg: "Date input must be today or before 2019-05-24"
        }
      }
    },
    checkout_time: DataTypes.DATEONLY,
    UserId: DataTypes.INTEGER,
    RoomId: DataTypes.INTEGER
  }, {});
  Booking.associate = function(models) {
    Booking.belongsTo(models.User)
    Booking.belongsTo(models.Room)
  };
  // let today = new Date()
  // Booking.prototype.dateValidate = function() {
  //   return this.arrival_time - today
  // }
  return Booking;
};