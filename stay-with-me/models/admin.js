'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Admin extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Admin.hasMany(models.Hotel)
        }

        fullName() {
          return `${this.first_name} ${this.last_name}`
        }
    };
    Admin.init({
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Admin',
    });
    return Admin;
};