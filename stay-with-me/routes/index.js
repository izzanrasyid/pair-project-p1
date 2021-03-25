const route = require('express').Router()

route.get('/', (req, res) => {
    //     // const username = req.session.username
    //     // const admin = req.session.admin
    // res.render('home', { username, admin })
    res.send('test koneksi')
})

module.exports = route