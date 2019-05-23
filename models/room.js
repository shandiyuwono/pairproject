'use strict';
module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    room_number: DataTypes.INTEGER,
    RoomTypeId: DataTypes.INTEGER,
    room_status: DataTypes.BOOLEAN
  }, {});
  Room.associate = function(models) {
    // associations can be defined here
  };
  return Room;
};