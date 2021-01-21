/* eslint-disable prettier/prettier */
const MenuItem = require('../models/menuItem-model');
const Repository = require("./repository");

class MenuItemRepository extends Repository {
  constructor() {
    super(MenuItem);
  }
}

module.exports = new MenuItemRepository();    