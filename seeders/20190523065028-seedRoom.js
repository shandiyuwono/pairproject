'use strict';
const fs = require('fs')

const rooms = fs.readFileSync('./room.csv').toString().split('\r\n').map(el=> {return el.split(',')}).slice(1)

let seed = []
for(let i = 0; i<= rooms.length-1; i++) {
    // let split = rooms[i].split(",")
    let obj = {
        room_number: rooms[i][0],
        RoomTypeId: rooms[i][1],
        createdAt: new Date(),
        updatedAt: new Date()
    }
    seed.push(obj)
}


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Rooms', seed)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDestroy('Rooms')
  }
};
