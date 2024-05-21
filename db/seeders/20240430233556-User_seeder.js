'use strict';

const { password } = require('../../models/user');
const bcryptjs = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const salt = bcryptjs.genSaltSync();
    return queryInterface.bulkInsert('Users', [
      {
        name: 'Diego',
        lastName: 'Aguilera',
        email: 'diego.aguilera@alumnos.ucn.cl',
        password: bcryptjs.hashSync("delivery2024", salt),
        phone: '986448520',
        image: '',
        role_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
  },], {});},
  
  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
