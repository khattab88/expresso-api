/* eslint-disable prettier/prettier */
const OrderItem = require('../models/orderItem-model');
const Repository = require("./repository");

class OrderItemRepository extends Repository {
  constructor() {
    super(OrderItem);
  }
}

module.exports = new OrderItemRepository();