/* eslint-disable prettier/prettier */
const Order = require('../models/order-model');
const Repository = require("./repository");

class OrderRepository extends Repository {
  constructor() {
    super(Order);
  }
}

module.exports = new OrderRepository();    