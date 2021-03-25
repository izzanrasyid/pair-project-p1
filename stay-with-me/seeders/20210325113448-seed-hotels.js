'use strict';

const hotels = require('../database/hotel.json')
hotels.forEach(e => {
    e.createdAt = new Date()
    e.updatedAt = new Date()
})

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Hotels', hotels, {})
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
        return queryInterface.bulkDelete('Hotels', null, {})
            /**
             * Add commands to revert seed here.
             *
             * Example:
             * await queryInterface.bulkDelete('People', null, {});
             */
    }
};