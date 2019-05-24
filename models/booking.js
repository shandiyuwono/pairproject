'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    arrival_time:  DataTypes.DATEONLY,
    checkout_time: DataTypes.DATEONLY,
    UserId: DataTypes.INTEGER,
    RoomId: DataTypes.INTEGER
  }, {});

  Booking.formatDate = function(date) {
    return new Date(date).toISOString().substr(0,10)
  }
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