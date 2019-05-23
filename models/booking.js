'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    arrival_time: DataTypes.DATE,
    checkout_time: DataTypes.DATE,
    UserId: DataTypes.INTEGER,
    RoomId: DataTypes.INTEGER
  }, {});
  Booking.associate = function(models) {
    Booking.belongsTo(models.User)
    Booking.belongsTo(models.Room)
  };
  return Booking;
};