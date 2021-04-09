/* eslint-disable prettier/prettier */
/* eslint-disable import/newline-after-import */
/* eslint-disable prettier/prettier */
const express = require('express');
const router = express.Router();

const addressRouter = require('./address-routes');

const userController = require('../controllers/user-controller');
const authController = require('../controllers/auth-controller');

// Protected All Routes
router.use(authController.protect);

// GET /users/35kjh0/addresses
// POST /users/35kjh0/addresses
router.use("/:userId/addresses", addressRouter);

// Admin Only Routes
router.use(authController.restrictTo("admin"));

router
    .route("/")
    .get(userController.getAllUsers)
    .post(userController.createUser);

router
    .route("/:id")
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;