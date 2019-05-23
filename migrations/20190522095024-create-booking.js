'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      arrival_time: {
        type: Sequelize.DATEONLY
      },
      checkout_time: {
        type: Sequelize.DATEONLY
      },
      UserId: {
        type: Sequelize.INTEGER,
        references : {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'set null',
        onUpdate: 'cascade'
      },
      RoomId: {
        type: Sequelize.INTEGER,
        references : {
          model: 'Rooms',
          key: 'id'
        },
        onDelete: 'set null',
        onUpdate: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Bookings');
  }
};