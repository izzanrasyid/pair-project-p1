const route = require('express').Router();
const UserController = require('../controllers/userController');
const checkUser = require('../middlewares/checkUser');

route.get('/register', UserController.formRegister)
route.post('/register', UserController.formRegisterPost)

route.get('/login', UserController.formLogin)
route.post('/login', UserController.formLoginPost)

route.get('/logout', UserController.logout)

// route.get('/:username', checkUser ,UserController)

// route.get('/:username/:BookId', checkUser, UserController)

// route.get('/:username/:id/return', checkUser ,UserController)




module.exports = route