'use strict';
const uuidv1 = require('uuid/v1');
const saltRounds = 10;
var bcrypt = require('bcrypt');


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      id: uuidv1(),
      username: 'batman_superman',
      email: 'test@test.com',
      password:bcrypt.hashSync("123123123", saltRounds),
      created_at: new Date(), 
      updated_at: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
