/* eslint-disable prettier/prettier */
const countryRepo = require('../repositories/country-repository');
const catchAsync = require("../utils/catch-async");
const AppError = require("../utils/app-error");
const controllerFactory = require("./controller-factory");

exports.getAllCountries = catchAsync(async (req, res, next) => {
    const countries = await countryRepo.getAll();

    res.status(200).json({
        status: "success",
        count: countries.length,
        data: { countries }
    });
});

exports.getCountry = controllerFactory.getById(countryRepo);

exports.createCountry = controllerFactory.create(countryRepo);

exports.updateCountry = controllerFactory.update(countryRepo);

exports.deleteCountry = controllerFactory.delete(countryRepo);