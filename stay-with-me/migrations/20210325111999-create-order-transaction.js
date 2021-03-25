'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('OrderTransactions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            HotelId: {
              type: Sequelize.INTEGER,
              references: {
                model: 'Hotels',
                key: 'id'
              },
              onUpdate: 'cascade',
              onDelete: 'cascade'
            },
            UserId: {
              type: Sequelize.INTEGER,
              references: {
                model: 'Users',
                key: 'id'
              },
              onUpdate: 'cascade',
              onDelete: 'cascade'
            },
            checkInDate: {
                type: Sequelize.DATE
            },
            checkOutDate: {
                type: Sequelize.DATE
            },
            status: {
                type: Sequelize.STRING
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
        return queryInterface.dropTable('OrderTransactions');
    }
};