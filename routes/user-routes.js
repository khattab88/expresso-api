/* eslint-disable prettier/prettier */
/* eslint-disable import/newline-after-import */
/* eslint-disable prettier/prettier */
const express = require('express');
const router = express.Router();

const userController = require('../controllers/user-controller');
const authController = require('../controllers/auth-controller');

router
    .route("/")
    .get(authController.protect, userController.getAllUsers)
    .post(authController.protect, userController.createUser);

router
    .route("/:id")
    .get(authController.protect, userController.getUser)
    .patch(authController.protect, userController.updateUser)
    .delete(
        authController.protect, 
        authController.restrictTo("admin"), 
        userController.deleteUser);

module.exports = router;