const express = require('express');
const router = express.Router();

const { register, login, logout, tokenRefresh } = require('../controller/authController.js');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/token-refresh', tokenRefresh);

module.exports = router;