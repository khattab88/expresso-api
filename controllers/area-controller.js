/* eslint-disable prettier/prettier */

const { Area } = require('expresso-models');

// const areaRepo = require('../repositories/area-repository');
const { areaRepository: areaRepo } = require('expresso-repositories');

const catchAsync = require("../utils/catch-async");
const AppError = require("../utils/app-error");

const controllerFactory = require("./controller-factory");


exports.setCityId = (req, res, next) => {
    // allow nested routes
    if (!req.body.city) req.body.city = req.params.cityId;

    next();
};

exports.getAllAreas = catchAsync(async (req, res, next) => {
    let areas = null;

    if (req.params.cityId) {
        areas = await areaRepo.getByCityId(req.params.cityId);
    } else {
        areas = await areaRepo.getAll();
    }

    res.status(200).json({
        status: "success",
        count: areas.length,
        data: { docs: areas }
    });
});

exports.getArea = controllerFactory.getById(areaRepo);

exports.getAreaBySlug = catchAsync(async (req, res, next) => {
    const slug = req.params.slug;
    
    const area = await Area.findOne({ slug });

    res.status(200).json({
        status: "success",
        data: { doc: area }
    });
});

exports.createArea = controllerFactory.create(areaRepo);

exports.updateArea = controllerFactory.update(areaRepo);

exports.deleteArea = controllerFactory.delete(areaRepo);
