/* eslint-disable prettier/prettier */
const { Category } = require('expresso-models');
const { categoryRepository: categoryRepo } = require('expresso-repositories');
const controllerFactory = require("./controller-factory");
const catchAsync = require("../utils/catch-async");
const AppError = require("../utils/app-error");

exports.getAllCategories = controllerFactory.getAll(Category, categoryRepo);

exports.getCategory = controllerFactory.getById(categoryRepo);

exports.createCategory = controllerFactory.create(categoryRepo);

exports.updateCategory = controllerFactory.update(categoryRepo);

exports.deleteCategory = controllerFactory.delete(categoryRepo);