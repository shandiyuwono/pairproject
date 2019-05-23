'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Bookings', 'arrival_time', Sequelize.DATEONLY)
      .then(() => {
        return queryInterface.changeColumn('Bookings', 'checkout_time', Sequelize.DATEONLY)
      })
  },

  down: (queryInterface, Sequelize) => {
    
  }
};
