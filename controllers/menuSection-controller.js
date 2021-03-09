/* eslint-disable prettier/prettier */

// const MenuSection = require('../models/menuSection-model');
const { MenuSection } = require('expresso-models');
// const menuSectionRepo = require('../repositories/menuSection-repository');
const { menuSectionRepository: menuSectionRepo } = require("expresso-repositories");
const controllerFactory = require("./controller-factory");
const catchAsync = require("../utils/catch-async");

exports.getAllMenuSections = controllerFactory.getAll(MenuSection, menuSectionRepo);

exports.getMenuSection = controllerFactory.getById(menuSectionRepo);

exports.createMenuSection = controllerFactory.create(menuSectionRepo);

exports.updateMenuSection = controllerFactory.update(menuSectionRepo);

exports.deleteMenuSection = controllerFactory.delete(menuSectionRepo);
