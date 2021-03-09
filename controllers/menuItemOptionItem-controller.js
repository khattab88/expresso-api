/* eslint-disable prettier/prettier */
const { MenuItemOptionItem } = require('expresso-models');
const { menuItemOptionItemRepository: menuItemOptionItemRepo } = require('expresso-repositories');
const controllerFactory = require("./controller-factory");
const catchAsync = require("../utils/catch-async");
const AppError = require("../utils/app-error");

exports.getAllMenuItemOptionItems = controllerFactory.getAll(MenuItemOptionItem, menuItemOptionItemRepo);

exports.getMenuItemOptionItem = controllerFactory.getById(menuItemOptionItemRepo);

exports.createMenuItemOptionItem = controllerFactory.create(menuItemOptionItemRepo);

exports.updateMenuItemOptionItem = controllerFactory.update(menuItemOptionItemRepo);

exports.deleteMenuItemOptionItem = controllerFactory.delete(menuItemOptionItemRepo);