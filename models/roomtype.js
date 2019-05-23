'use strict';
module.exports = (sequelize, DataTypes) => {
  const RoomType = sequelize.define('RoomType', {
    type: DataTypes.STRING,
    price: DataTypes.INTEGER,
    size: DataTypes.INTEGER,
    capacity: DataTypes.INTEGER
  }, {});
  RoomType.associate = function(models) {
    // associations can be defined here
  };
  return RoomType;
};