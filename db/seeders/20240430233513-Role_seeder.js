'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Roles', [
      {
        name: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date()
  },{
    name: 'Customer',
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    name: 'Delivery',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {});},

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};