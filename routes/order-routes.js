/* eslint-disable prettier/prettier */
/* eslint-disable import/newline-after-import */
/* eslint-disable prettier/prettier */
const express = require('express');
const router = express.Router();

const orderController = require('../controllers/order-controller');
const authController = require('../controllers/auth-controller');

router.get(
    "/checkout-session", 
    authController.protect,
    orderController.getCheckoutSession);


module.exports = router;
