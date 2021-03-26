const bcrypt = require('bcrypt')
const { Admin, Hotel, User, OrderTransaction } = require('../models')
const transporter = require('../helper/nodemailer')

class UserController {
    static formRegister(req, res) {
        const alert = req.query.alert || null
        const username = req.session.username
        const admin = req.session.Admin
        res.render('./users/register', { alert, username, admin })
    }

    static formRegisterPost(req, res) {
        const obj = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            phone_number: req.body.phone_number
        }
        User.findOne({
                where: {
                    username: obj.username
                }
            })
            .then(data => {
                if (data) {
                    res.send('username is taken')
                } else {
                    return User.create(obj)
                }
            })
            .then(newUser => {
                req.session.username = obj.username
                res.redirect('/Hotels')
            })
            .catch(err => {
                if (err.errors) {
                    const problems = err.errors.map(el => el.message)
                    res.redirect(`/users/register?alert=${problems}`)
                } else {
                    res.send(err)
                }
            })
    }

    static formLogin(req, res) {
        const alert = req.query.alert || null
        const username = req.session.username
        const admin = req.session.admin
        res.render('./users/login', { alert, username, admin })
    }

    static formLoginPost(req, res) {
        const username = req.body.username
        const password = req.body.password
        console.log([username, password]);

        if (!username || !password) {
            const msg = ['username or password is empty']
            res.redirect(`/users/login?alert=${msg}`)

        } else {
            User.findOne({
                    where: {
                        username: username
                    }
                })
                .then(data => {
                    if (!data) {
                        return Admin.findOne({ where: { first_name: username } })
                    } else {
                        if (bcrypt.compareSync(password, data.password)) {
                            req.session.username = username
                            res.redirect('/Hotels')
                        } else {
                            let error = ['password is incorrect']
                            res.redirect(`/users/login?alert=${error}`)
                        }
                    }
                })
                .then(admin => {
                    if (admin) {
                        if (password === admin.last_name) {
                            req.session.admin = admin.last_name
                            console.log(req.session.admin)
                            res.redirect('/Hotels')
                        } else {
                            let error = ['password is incorrect']
                            res.redirect(`/users/login?alert=${error}`)
                        }
                    } else {
                        let usernameX = ['username is not found']
                        res.redirect(`/users/login?alert=${usernameX}`)
                    }
                })
                .catch(err => {
                    res.send(err)
                })
        }
    }

    static logout(req, res) {
        req.session.destroy(err => {
            if (err) {
                res.send(err)
            } else {
                res.redirect('/')
            }
        })
    }

    static history(req, res) {
        const username = req.params.username
        const admin = req.session.admin
        let user;

        User.findOne({
                where: {
                    username: username
                }
            })
            .then(data => {
                user = data
                return OrderTransaction.findAll({
                    where: {
                        UserId: data.id
                    },
                    include: Hotel,
                    attributes: ['id', 'UserId', 'HotelId', 'checkInDate', 'checkOutDate', 'status'],
                    order: [
                        ['id', 'DESC']
                    ]
                })
            })
            .then(result => {
                res.render('users/history', { result, user, username, admin })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static booking(req, res) {
        const username = req.params.username
        const HotelId = req.params.HotelId
        let user;
        let orderBooking

        User.findOne({
                where: {
                    username: username
                }
            })
            .then(data => {
                user = data

                return OrderTransaction.create({
                    UserId: data.id,
                    HotelId: HotelId,
                    checkInDate: new Date(),
                    status: 'booked'
                })
            })
            .then(data2 => {
                orderBooking = data2

                return Hotel.update({ status: 'booked' }, {
                    where: {
                        id: HotelId
                    },
                    returning: true
                })
            })
            .then(result => {

                let mailOptions = {
                    from: '"Stay With Me <booking@staywithme.com>',
                    to: "fauzan@mail.com, riod@gmail.com",
                    subject: "Hotel Booking Confirmation",
                    text: "Your Booking!",
                    html: "<b>Your hotel reservation has been successfully confirmed!</b>",
                };

                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                res.redirect(`/users/${username}`)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static paid(req, res) {
        const username = req.params.username
        const id = +req.params.id
        let user;

        OrderTransaction.update({ checkOutDate: new Date() }, {
                where: {
                    id: id
                },
                returning: true
            })
            .then(result => {
                return Hotel.update({ status: 'available' }, {
                    where: {
                        id: result[1][0].HotelId
                    },
                    returning: true
                })
            })
            .then(data => {
                let mailOptions = {
                    from: '"Stay With Me <confirmation@staywithme.com>',
                    to: "fauzan@mail.com, riod@gmail.com",
                    subject: "Hotel Paid Confirmation",
                    text: "Your Paid!",
                    html: "<b>Your hotel payment has been successfully confirmed, enjoy sleeping!</b>",
                };


                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                res.redirect(`/users/${username}`)
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    }
}

module.exports = UserController