'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('RoomTypes', [
      {
        type: 'Single',
        price: 300000,
        size: 22,
        capacity: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: 'Double',
        price: 450000,
        size: 33,
        capacity: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: 'Triple',
        price: 500000,
        size: 45,
        capacity: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: 'Quad',
        price: 600000,
        size: 60,
        capacity: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDestroy('RoomTypes')
  }
};
