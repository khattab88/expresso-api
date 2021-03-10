/* eslint-disable prefer-destructuring */
/* eslint-disable prettier/prettier */

// const City = require("../models/city-model");
const { City, Area } = require('expresso-models');
// const cityRepo = require("../repositories/city-repository");
const { cityRepository: cityRepo, areaRepository: areaRepo } = require("expresso-repositories");

const catchAsync = require("../utils/catch-async");
const AppError = require("../utils/app-error");

const controllerFactory = require("./controller-factory");


exports.setCountryId = (req, res, next) => {
    // allow nested rotes
    if(!req.body.country) req.body.country = req.params.countryId;
    
    next();
};

exports.getAllCities = catchAsync(async (req, res, next) => {
    let cities = null;

    if(req.params.countryId) {
        cities = await cityRepo.getByCountryId(req.params.countryId);
    } else {
        cities = await cityRepo.getAll();
    }

    cities = [...cities].map(c => {
        return {
            _id: c._id,
            id: c.id,
            name: c.name
        }
    });

    for(let city of cities) {
        // city.areas = await areaRepo.getByCityId(city._id);
        city.areas = await Area.find({ "city": city._id });
    }

    // console.log(cities);
    
    res.status(200).json({
        status: "success",
        count: cities.length,
        data: { docs: cities }
    });
});

exports.getCity = controllerFactory.getById(cityRepo);

exports.createCity = controllerFactory.create(cityRepo);

exports.updateCity = controllerFactory.update(cityRepo);

exports.deleteCity = controllerFactory.delete(cityRepo);