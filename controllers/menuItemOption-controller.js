/* eslint-disable prettier/prettier */
const { MenuItemOption } = require('expresso-models');
const { menuItemOptionRepository: menuItemOptionRepo } = require('expresso-repositories');
const controllerFactory = require("./controller-factory");
const catchAsync = require("../utils/catch-async");
const AppError = require("../utils/app-error");

exports.getAllMenuItemOptions = controllerFactory.getAll(MenuItemOption, menuItemOptionRepo);

exports.getMenuItemOption = controllerFactory.getById(menuItemOptionRepo);

exports.createMenuItemOption = controllerFactory.create(menuItemOptionRepo);

exports.updateMenuItemOption = controllerFactory.update(menuItemOptionRepo);

exports.deleteMenuItemOption = controllerFactory.delete(menuItemOptionRepo);