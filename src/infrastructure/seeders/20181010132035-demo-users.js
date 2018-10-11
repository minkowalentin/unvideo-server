'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      username: 'yeesss',
      messages: [
        {
          text: 'Happy to release ...',
        },
        {
          text: 'Published a complete ...',
        },
      ],
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users',null,{});
  }
};
