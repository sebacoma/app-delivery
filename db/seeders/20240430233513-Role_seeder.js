'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Roles', [
      {
        name: 'ADMINISTRADOR',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
      name: 'REPARTIDOR',
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      name: 'CLIENTE',
      createdAt: new Date(),
      updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Roles',null, {})
  }
};