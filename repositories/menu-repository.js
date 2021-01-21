/* eslint-disable prettier/prettier */
const Menu = require('../models/menu-model');
const Repository = require("./repository");

class MenuRepository extends Repository {
  constructor() {
    super(Menu);
  }
}

module.exports = new MenuRepository();    