/* eslint-disable prettier/prettier */
const MenuSection = require('../models/menuSection-model');
const Repository = require("./repository");

class MenuSectionRepository extends Repository {
  constructor() {
    super(MenuSection);
  }
}

module.exports = new MenuSectionRepository();    