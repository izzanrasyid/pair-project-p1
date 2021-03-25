const { Admin, Hotel, User, UserHotel } = require('../models')

class AdminController {
    static listAll(req, res) {
        const username = req.session.username
        const Admin = req.session.admin

        Admin.findAll({
                include: Hotel
            })
            .then(data => {
                res.render('./admins/list', { username, data, admin })
            })
            .catch(err => {
                res.send(err)
            })
    }
}

module.exports = AdminController