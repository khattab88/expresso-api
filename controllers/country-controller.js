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

exports.createCountry = catchAsync(async (req, res, next) => {
    const newCountry = await countryRepo.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
          country: newCountry,
        }
    });
});

exports.updateCountry = catchAsync(async (req, res, next) => {
    const updated = await countryRepo.update(req.params.id, req.body);

    if(!updated) {
        return res.status(404).json({ 
            status: "fail",
            message: "not found!"
        });
      }
    
      res.status(200).json({
        status: 'success',
        data: {
          country: updated,
        }
      });
});

exports.deleteCountry = controllerFactory.delete(countryRepo);