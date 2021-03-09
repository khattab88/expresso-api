/* eslint-disable prettier/prettier */

// const Menu = require('../models/menu-model');
const { Menu } = require('expresso-models');
// const menuRepo = require('../repositories/menu-repository');
const { menuRepository: menuRepo } = require('expresso-repositories');

const controllerFactory = require("./controller-factory");
const catchAsync = require("../utils/catch-async");

exports.getAllMenus = controllerFactory.getAll(Menu, menuRepo);

exports.getMenu = controllerFactory.getById(menuRepo);

exports.createMenu = controllerFactory.create(menuRepo);

exports.updateMenu = controllerFactory.update(menuRepo);

exports.deleteMenu = controllerFactory.delete(menuRepo);
