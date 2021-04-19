/* eslint-disable prettier/prettier */
/* eslint-disable import/newline-after-import */
/* eslint-disable prettier/prettier */
const express = require('express');
const router = express.Router();

const orderController = require('../controllers/order-controller');
const authController = require('../controllers/auth-controller');

// router.get("/checkout-session/:orderId", 
//             authController.protect,
//             orderController.getCheckoutSession);

router
    .route("/")
    .post(authController.protect, orderController.createOrder);

router
    .route("/:id")
    .get(authController.protect, orderController.getOrder)
    .patch(authController.protect, orderController.updateOrder);

module.exports = router;
