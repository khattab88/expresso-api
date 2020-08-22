/* eslint-disable prefer-destructuring */
/* eslint-disable prettier/prettier */
const cityRepo = require("../repositories/city-repository");
const catchAsync = require("../utils/catch-async");
const AppError = require("../utils/app-error");
const City = require("../models/city-model");
const controllerFactory = require("./controller-factory");


exports.getAllCities = catchAsync(async (req, res, next) => {
    let cities = null;

    if(req.params.countryId) {
        cities = await cityRepo.getByCountryId(req.params.countryId);
    } else {
        cities = await cityRepo.getAll();
    }
    
    res.status(200).json({
        status: "success",
        count: cities.length,
        data: {
            cities: cities
        }
    });
});

exports.getCity = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const city = await cityRepo.getById(id);

    if(!city) {
        return next(new AppError("No city found with that id!", 404));
    }

    res.status(200).json({
        status: 'success',
        data: { city }
    });
});

exports.createCity = catchAsync(async (req, res, next) => {
    // allow nested rotes
    if(!req.body.country) req.body.country = req.params.countryId;

    const newCity = await cityRepo.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
          city: newCity,
        }
    });
});

exports.updateCity = controllerFactory.update(cityRepo);

exports.deleteCity = controllerFactory.delete(cityRepo);