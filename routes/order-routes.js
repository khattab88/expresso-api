/* eslint-disable prettier/prettier */
/* eslint-disable import/newline-after-import */
/* eslint-disable prettier/prettier */
const express = require('express');
const router = express.Router({ mergeParams: true });

const orderItemRouter = require('./orderItem-routes');

const orderController = require('../controllers/order-controller');
const authController = require('../controllers/auth-controller');

// router.get("/checkout-session/:orderId", 
//             authController.protect,
//             orderController.getCheckoutSession);

router.use(authController.protect);

// GET /orders/35kjh0/orderitems
router.use("/:orderId/orderitems", orderItemRouter);

router
    .route("/")
    .get(orderController.getAllOrders)
    .post(orderController.createOrder);

router
    .route("/:id")
    .get(orderController.getOrder)
    .patch(orderController.updateOrder);

module.exports = router;
