/* eslint-disable prettier/prettier */
/* eslint-disable import/newline-after-import */
/* eslint-disable prettier/prettier */
const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth-controller');

router
    .route("/signup")
    .post(authController.signup);

module.exports = router;