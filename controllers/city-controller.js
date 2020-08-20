/* eslint-disable prefer-destructuring */
/* eslint-disable prettier/prettier */
const cityRepo = require("../repositories/city-repository");
const catchAsync = require("../utils/catch-async");
const AppError = require("../utils/app-error");
const City = require("../models/city-model");


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

exports.updateCity = catchAsync(async (req, res, next) => {
    const updated = await cityRepo.update(req.params.id, req.body);

    if(!updated) {
        return res.status(404).json({ 
            status: "fail",
            message: "not found!"
        });
      }
    
      res.status(200).json({
        status: 'success',
        data: {
          city: updated,
        }
      });
});

exports.deleteCity = catchAsync(async (req, res, next) => {
    const city = await cityRepo.getById(req.params.id);

    if(!city) return next(new AppError(`City with id: ${req.params.id} is not found!`, 404));

    await cityRepo.delete(req.params.id);

    res.status(204).json({
        status: 'success',
        data: null,
    });
});