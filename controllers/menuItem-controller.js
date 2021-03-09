/* eslint-disable prettier/prettier */

// const MenuItem = require('../models/menuItem-model');
const { MenuItem } = require('expresso-models');
// const menuItemRepo = require('../repositories/menuItem-repository');
const { menuItemRepository: menuItemRepo } = require('expresso-repositories');

const controllerFactory = require("./controller-factory");
const catchAsync = require("../utils/catch-async");


exports.getAllMenuItems = controllerFactory.getAll(MenuItem, menuItemRepo);

exports.getMenuItem = controllerFactory.getById(menuItemRepo);

exports.createMenuItem = controllerFactory.create(menuItemRepo);

exports.updateMenuItem = controllerFactory.update(menuItemRepo);

exports.deleteMenuItem = controllerFactory.delete(menuItemRepo);
