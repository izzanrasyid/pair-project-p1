'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class OrderTransaction extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            OrderTransaction.belongsTo(models.User)
            OrderTransaction.belongsTo(models.Hotel)
        }
    };
    OrderTransaction.init({
        HotelId: DataTypes.INTEGER,
        UserId: DataTypes.INTEGER,
        checkInDate: DataTypes.DATE,
        checkOutDate: DataTypes.DATE,
        status: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'OrderTransaction',
    });
    return OrderTransaction;
};