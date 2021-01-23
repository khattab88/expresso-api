/* eslint-disable prettier/prettier */
/* eslint-disable import/newline-after-import */
/* eslint-disable prettier/prettier */
const express = require('express');
const router = express.Router();

const orderItemController = require('../controllers/orderItem-controller');
const authController = require('../controllers/auth-controller');


router
    .route('/')
    .get(orderItemController.getAllOrderItems)
    .post(authController.protect, orderItemController.createOrderItem);

router
    .route("/:id")
    .get(orderItemController.getOrderItem)
    .patch(authController.protect, orderItemController.updateOrderItem)
    .delete(authController.protect, orderItemController.deleteOrderItem);

module.exports = router;