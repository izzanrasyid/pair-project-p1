'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Hotel extends Model {

        static associate(models) {
            Hotel.belongsTo(models.Admin)
            Hotel.belongsToMany(models.User, { through: models.OrderTransaction })
        }
        convert() {
            var rupiah = '';
            var angkarev = this.price.toString().split('').reverse().join('');
            for (var i = 0; i < angkarev.length; i++) {
                if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
            }
            return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('') + ',00';
        }

    };
    Hotel.init({
        name: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'a Hotel must have a name'
                }
            }
        },
        facility: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'a Hotel must have a facility'
                }
            }
        },
        location: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'please insert the location'
                }
            }
        },
        status: DataTypes.STRING,
        url: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'please provide an url'
                },
                isUrl: {
                    args: true,
                    msg: 'please insert a valid url'
                }
            }
        },
        price: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'please insert price'
                }
            }
        },
        AdminId: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'please insert the Admin'
                }
            }
        },
    }, {
        sequelize,
        modelName: 'Hotel',
    });

    Hotel.addHook('beforeCreate', (instance, options) => {
        instance.status = 'available'
        instance.facility = `{${instance.facility}}`
    })
    Hotel.addHook('beforeUpdate', (instance, options) => {
        instance.facility = `{${instance.facility}}`
    })

    return Hotel;
};