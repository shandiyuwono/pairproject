'use strict';
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Email format is incorrect!'
        },
        uniqueCheck(value) {
           return User.findOne({
              where : {
                email : value
              }
            })
              .then(email => {
                if(email) {
                  throw new Error('Email must be unique!')
                }
              })
        }
      }
    },
    phone: DataTypes.STRING
  }, {});

  User.addHook('beforeCreate', (user, options) => {
    let hash = bcrypt.hashSync(user.password,10)
    user.password = hash
  });
  User.associate = function(models) {
    User.hasMany(models.Booking)
  };
  return User;
};