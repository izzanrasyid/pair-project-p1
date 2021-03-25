const route = require('express').Router()
const HotelController = require('../controllers/hotelController')

route.get('/', HotelController.listHotels)

route.get('/add', HotelController.addHotel)
route.post('/add', HotelController.addHotelPost)

route.get('/:id/delete', HotelController.delete)

route.get('/:id/edit', HotelController.editForm)
route.post('/:id/edit', HotelController.edit)

module.exports = route