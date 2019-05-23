'use strict';
module.exports = (sequelize, DataTypes) => {
  const RoomType = sequelize.define('RoomType', {
    price: DataTypes.INTEGER,
    size: DataTypes.INTEGER,
    capacity: DataTypes.INTEGER,
    amenity: DataTypes.STRING
  }, {});
  RoomType.associate = function(models) {
    // associations can be defined here
  };
  return RoomType;
};