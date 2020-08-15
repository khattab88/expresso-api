/* eslint-disable prettier/prettier */
/* eslint-disable import/newline-after-import */
/* eslint-disable prettier/prettier */
const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth-controller');

router
    .route("/signup")
    .post(authController.signup);

router
    .route("/login")
    .post(authController.login);

router
    .route("/forgotPassword")
    .post(authController.forgotPassword);

router
    .route("resetPassword/:token")
    .patch(authController.resetPassword);

module.exports = router;