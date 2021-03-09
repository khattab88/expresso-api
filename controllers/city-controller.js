/* eslint-disable prefer-destructuring */
/* eslint-disable prettier/prettier */

// const City = require("../models/city-model");
// const { City } = require('expresso-models');
// const cityRepo = require("../repositories/city-repository");
const { cityRepository: cityRepo } = require("expresso-repositories");

const catchAsync = require("../utils/catch-async");
const AppError = require("../utils/app-error");

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
        data: { docs: cities }
    });
});

exports.getCity = controllerFactory.getById(cityRepo);

exports.setCountryId = (req, res, next) => {
    // allow nested rotes
    if(!req.body.country) req.body.country = req.params.countryId;
    
    next();
};

exports.createCity = controllerFactory.create(cityRepo);

exports.updateCity = controllerFactory.update(cityRepo);

exports.deleteCity = controllerFactory.delete(cityRepo);