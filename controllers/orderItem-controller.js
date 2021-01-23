/* eslint-disable prettier/prettier */
const OrderItem = require('../models/orderItem-model');
const orderItemRepo = require('../repositories/orderItem-repository');
const controllerFactory = require("./controller-factory");

exports.getAllOrderItems = controllerFactory.getAll(OrderItem, orderItemRepo);

exports.getOrderItem = controllerFactory.getById(orderItemRepo);

exports.createOrderItem = controllerFactory.create(orderItemRepo);

exports.updateOrderItem = controllerFactory.update(orderItemRepo);

exports.deleteOrderItem = controllerFactory.delete(orderItemRepo);
