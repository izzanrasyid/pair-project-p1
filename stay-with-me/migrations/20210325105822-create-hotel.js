'use strict';

const { sequelize } = require("../models");

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Hotels', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            facility: {
                type: Sequelize.STRING
            },
            location: {
                type: Sequelize.STRING
            },
            status: {
              type: Sequelize.STRING
            },
            url: {
                type: Sequelize.STRING
            },
            price: {
                type: Sequelize.INTEGER
            },
            AdminId: {
              type: Sequelize.INTEGER,
              references: {
                model: 'Admins',
                key: 'id'
              },
              onUpdate: 'cascade',
              onDelete: 'cascade'
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
        return queryInterface.dropTable('Hotels');
    }
};