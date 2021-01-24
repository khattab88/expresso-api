/* eslint-disable prettier/prettier */
const express = require('express');

const viewController = require('../controllers/view-controller');
const authController = require('../controllers/auth-controller');

const router = express.Router();

// ROUTES
router.get("/checkout/:orderId", authController.protect, viewController.checkout);


module.exports = router;
