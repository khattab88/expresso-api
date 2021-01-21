/* eslint-disable prettier/prettier */
const MenuSection = require('../models/menuSection-model');
const menuSectionRepo = require('../repositories/menuSection-repository');
const controllerFactory = require("./controller-factory");

exports.getAllMenuSections = controllerFactory.getAll(MenuSection, menuSectionRepo);

exports.getMenuSection = controllerFactory.getById(menuSectionRepo);

exports.createMenuSection = controllerFactory.create(menuSectionRepo);

exports.updateMenuSection = controllerFactory.update(menuSectionRepo);

exports.deleteMenuSection = controllerFactory.delete(menuSectionRepo);
