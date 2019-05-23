'use strict';
// const {Booking, RoomType} = require('../models/index')
const {Booking, RoomType} = require('./index')

module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    room_number: DataTypes.INTEGER,
    RoomTypeId: DataTypes.INTEGER
  }, {});


  Room.status = function () {

    return new Promise((resolve,reject) => {
     
      
    })
  }  


  Room.associate = function(models) {
    Room.belongsTo(models.RoomType)
    Room.hasMany(models.Booking)
  };
  return Room;
};