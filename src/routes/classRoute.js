const { Router } = require('express');
const route = Router();
const ClassController = require('../controller/ClassController');
const middleware = require('../middleware/authen');

route.get('/all-user', middleware.authenAdim, ClassController.getAllUser);

module.exports = route;
