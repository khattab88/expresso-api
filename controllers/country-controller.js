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

exports.getCountry = catchAsync(async (req, res, next) => {
    // eslint-disable-next-line prefer-destructuring
    const id = req.params.id;
    const country = await countryRepo.getById(id);

    if(!country) {
        return next(new AppError("No Country found with that id!", 404));
    }

    res.status(200).json({
        status: 'success',
        data: { country }
    });
});

exports.createCountry = controllerFactory.create(countryRepo);

exports.updateCountry = controllerFactory.update(countryRepo);

exports.deleteCountry = controllerFactory.delete(countryRepo);