const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user');

router.post('/create', userController.create_user);

router.post('/login', userController.handle_login);

module.exports = router;
