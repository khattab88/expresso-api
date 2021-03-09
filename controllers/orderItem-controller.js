/* eslint-disable prettier/prettier */

// const OrderItem = require('../models/orderItem-model');
const { OrderItem } = require('expresso-models');
// const orderItemRepo = require('../repositories/orderItem-repository');
const { orderItemRepository: orderItemRepo } = require('expresso-repositories');
const controllerFactory = require("./controller-factory");
const catchAsync = require("../utils/catch-async");

exports.getAllOrderItems = controllerFactory.getAll(OrderItem, orderItemRepo);

exports.getOrderItem = controllerFactory.getById(orderItemRepo);

exports.createOrderItem = controllerFactory.create(orderItemRepo);

exports.updateOrderItem = controllerFactory.update(orderItemRepo);

exports.deleteOrderItem = controllerFactory.delete(orderItemRepo);
