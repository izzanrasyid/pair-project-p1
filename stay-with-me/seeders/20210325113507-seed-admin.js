'use strict';

const admins = require('../database/admin.json')
admins.forEach(e => {
    e.createdAt = new Date()
    e.updatedAt = new Date()
})

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Admins', admins, {})
            /**
             * Add seed commands here.
             *
             * Example:
             * await queryInterface.bulkInsert('People', [{
             *   name: 'John Doe',
             *   isBetaMember: false
             * }], {});
             */
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Admins', null, {})
            /**
             * Add commands to revert seed here.
             *
             * Example:
             * await queryInterface.bulkDelete('People', null, {});
             */
    }
};