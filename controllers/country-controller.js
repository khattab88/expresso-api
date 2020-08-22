/* eslint-disable prettier/prettier */
const Country = require('../models/country-model');
const countryRepo = require('../repositories/country-repository');
const catchAsync = require("../utils/catch-async");
const AppError = require("../utils/app-error");
const controllerFactory = require("./controller-factory");


exports.getAllCountries = controllerFactory.getAll(Country, countryRepo);

exports.getCountry = controllerFactory.getById(countryRepo);

exports.createCountry = controllerFactory.create(countryRepo);

exports.updateCountry = controllerFactory.update(countryRepo);

exports.deleteCountry = controllerFactory.delete(countryRepo);