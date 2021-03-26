const { Admin, Hotel, User } = require('../models')
const transporter = require('../helper/nodemailer')

class HotelController {
    static listHotels(req, res) {
        Hotel.findAll({
                include: Admin,
                order: [
                    ['id', 'desc']
                ]
            })
            .then(data => {
                const username = req.session.username

                const admin = req.session.admin
                res.render('./hotels/list', { data, username, admin })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static addHotel(req, res) {
        const alert = req.query.alert
        const username = req.session.username
        const admin = req.session.admin
        Admin.findAll()
            .then(data => {
                res.render('./hotels/add', { username, admin, data, alert })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static addHotelPost(req, res) {
        const newHotel = {
            name: req.body.name,
            facility: req.body.facility,
            location: req.body.location,
            url: req.body.url,
            price: req.body.price,
            AdminId: 1
        }
        const emails = []
        User.findAll()
            .then(result => {
                result.forEach(el => emails.push(el.email))
                return Hotel.create(newHotel)
            })
            .then(data => {
                let mailOptions = {
                    from: '"Stay With Me <info@staywithme.com>',
                    to: "fauzan@mail.com, riod@gmail.com",
                    subject: "New Hotel Just Coming",
                    text: "For your information!",
                    html: "<b>Hello, there's a new hotels in our list, come be the first to feel it!</b>",
                };


                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                res.redirect('/hotels')
            })
            .catch(err => {
                if (err.errors) {
                    const alert = err.errors.map(element => {
                        return element.message
                    })

                    res.redirect(`/hotels/add?alert=${alert}`)

                } else {
                    res.send(err)
                }
            })
    }

    static editForm(req, res) {
        const alert = req.query.alert
        const username = req.session.username

        const admin = req.session.admin
        let hotel
        const id = +req.params.id
        Hotel.findByPk(id, {
                include: Admin
            })
            .then(result => {
                hotel = result
                return Admin.findAll()
            })

        .then(data => {
                res.render('../views/hotels/edit.ejs', { data, username, admin, hotel, alert })

            })
            .catch(err => {
                res.send(err)
            })
    }

    static edit(req, res) {
        const id = +req.params.id
        const value = {

            name: req.body.name,
            facility: req.body.facility,
            location: req.body.location,
            url: req.body.url,
            price: req.body.price,
            AdminId: 1
        }
        Hotel.update(value, {

                where: {
                    id: id
                },
                individualHooks: true
            })
            .then(data => {

                res.redirect('/hotels')
            })
            .catch(err => {
                if (err.errors) {
                    const alert = err.errors.map(element => {
                        return element.message
                    })

                    res.redirect(`/hotels/${id}/edit?alert=${alert}`)

                } else {
                    res.send(err)
                }
            })
    }

    static delete(req, res) {

        Hotel.destroy({

                where: {
                    id: +req.params.id
                }
            })
            .then(data => {


                res.redirect('/hotels')

            })
            .catch(err => {
                res.send(err)
            })
    }
}



module.exports = HotelController