const { Router } = require('express');
const route = Router();
const UserController = require('../controller/UserController');

route.post('/sign-up', UserController.SignUp);
route.post('/log-in', UserController.LogIn);
route.get('/log-out', UserController.LogOut);
route.get('/refresh-token', UserController.RefreshToken);
route.get('/delete', UserController.delete);
route.get('/all', UserController.all);

module.exports = route;
