const route = require('express').Router()
const userRoute = require('./userRoute')
const hotelRoute = require('./hotelRoute')


route.get('/', (req, res) => {
    const username = req.session.username
    const admin = req.session.admin
    res.render('home', { username, admin })
        // res.send('test koneksi')
})

route.use('/hotels', hotelRoute)
route.use('/users', userRoute)

module.exports = route