/* eslint-disable prettier/prettier */

// const OrderItem = require('../models/orderItem-model');
const { OrderItem } = require('expresso-models');
// const orderItemRepo = require('../repositories/orderItem-repository');
const { orderRepository: orderRepo, orderItemRepository: orderItemRepo } = require('expresso-repositories');
const controllerFactory = require("./controller-factory");
const catchAsync = require("../utils/catch-async");

// exports.getAllOrderItems = controllerFactory.getAll(OrderItem, orderItemRepo);

exports.getAllOrderItems = catchAsync(async (req, res, next) => {
    let orderItems = null;

    if(req.params.orderId) {
        const order = await orderRepo.getById(req.params.orderId);
        orderItems = await OrderItem.find({ "order": order._id });
    } else {
        // orderItems = await orderItemRepo.getAll();
        orderItems = [];
    }

    res.status(200).json({
        status: "success",
        count: orderItems.length,
        data: { docs: orderItems }
    });
});

exports.getOrderItem = controllerFactory.getById(orderItemRepo);

exports.createOrderItem = controllerFactory.create(orderItemRepo);

exports.updateOrderItem = controllerFactory.update(orderItemRepo);

exports.deleteOrderItem = controllerFactory.delete(orderItemRepo);
