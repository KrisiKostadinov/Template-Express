const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const mls = require('../config/mls');

router.get('/register', controllers.usersController.getRegister);
router.get('/login', controllers.usersController.getLogin);

router.post('/register', controllers.usersController.postRegister);
router.post('/login', controllers.usersController.postLogin);
router.delete('/logout', mls.auth, controllers.usersController.logout);

module.exports = router;