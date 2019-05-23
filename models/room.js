'use strict';
module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    room_number: DataTypes.INTEGER,
    RoomTypeId: DataTypes.INTEGER
  }, {});
  Room.associate = function(models) {
    Room.belongsTo(models.RoomType)
    Room.hasMany(models.Booking)
  };
  return Room;
};