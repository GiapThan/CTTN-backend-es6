const { Router } = require('express');
const route = Router();
const MinhChungController = require('../controller/MinhChungController');

route.get('/upload', MinhChungController.upload);
route.get('/delete/:id', MinhChungController.delete);
route.get('/public/:id', MinhChungController.generatePublicUrl);

module.exports = route;
