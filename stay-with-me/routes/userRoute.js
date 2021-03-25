const route = require('express').Router;
const UserController = require('../controllers/userController');
const checkUser = require('../middlewares/checkUser');

route.get('/register', UserController.formRegister)
    // route.post('/register', UserController)

// route.get('/login', UserController)
// route.post('/login', UserController)

// route.get('/logout', UserController)

// route.get('/:username', checkUser ,UserController)

// route.get('/:username/:BookId', checkUser, UserController)

// route.get('/:username/:id/return', checkUser ,UserController)




module.exports = route