'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Hotel extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Hotel.belongsTo(models.Admin),
                Hotel.belongsToMany(models.User, {
                    through: 'OrderTransaction',
                    foreignKey: 'HotelId'
                })
        }
    };
    Hotel.init({
        name: DataTypes.STRING,
        facility: DataTypes.STRING,
        location: DataTypes.STRING,
        url: DataTypes.STRING,
        price: DataTypes.INTEGER,
        AdminId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Hotel',
    });
    return Hotel;
};