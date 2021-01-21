/* eslint-disable prettier/prettier */
const MenuItem = require('../models/menuItem-model');
const menuItemRepo = require('../repositories/menuItem-repository');
const controllerFactory = require("./controller-factory");

exports.getAllMenuItems = controllerFactory.getAll(MenuItem, menuItemRepo);

exports.getMenuItem = controllerFactory.getById(menuItemRepo);

exports.createMenuItem = controllerFactory.create(menuItemRepo);

exports.updateMenuItem = controllerFactory.update(menuItemRepo);

exports.deleteMenuItem = controllerFactory.delete(menuItemRepo);
