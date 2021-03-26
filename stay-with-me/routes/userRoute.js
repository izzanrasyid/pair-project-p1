const route = require('express').Router();
const UserController = require('../controllers/userController');
const checkUser = require('../middlewares/checkUser');

route.get('/register', UserController.formRegister)
route.post('/register', UserController.formRegisterPost)

route.get('/login', UserController.formLogin)
route.post('/login', UserController.formLoginPost)

route.get('/logout', UserController.logout)

route.get('/:username', checkUser ,UserController.history)

route.get('/:username/:HotelId', checkUser, UserController.booking)

route.get('/:username/:id/return', checkUser ,UserController.paid)




module.exports = route