const bcrypt = require('bcrypt')
const { Admin, Hotel, User, OrderTransaction } = require('../models')
const transporter = require('../helper/nodemailer')

class UserController {
    static formRegister(req, res) {
        const alert = req.query.alert || null
        const username = req.session.username
        const admin = req.session.Admin
        res.render('register', { alert, username, admin })
    }

}

module.exports = UserController