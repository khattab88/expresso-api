/* eslint-disable prettier/prettier */
const Menu = require('../models/menu-model');
const menuRepo = require('../repositories/menu-repository');
const controllerFactory = require("./controller-factory");

exports.getAllMenus = controllerFactory.getAll(Menu, menuRepo);

exports.getMenu = controllerFactory.getById(menuRepo);

exports.createMenu = controllerFactory.create(menuRepo);

exports.updateMenu = controllerFactory.update(menuRepo);

exports.deleteMenu = controllerFactory.delete(menuRepo);
