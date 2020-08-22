/* eslint-disable prettier/prettier */
const areaRepo = require('../repositories/area-repository');
const catchAsync = require("../utils/catch-async");
const AppError = require("../utils/app-error");
const controllerFactory = require("./controller-factory");

exports.getAllAreas = catchAsync(async (req, res, next) => {
    let areas = null;

    if(req.params.cityId) {
        areas = await areaRepo.getByCityId(req.params.cityId);
    } else {
        areas = await areaRepo.getAll();
    }

    res.status(200).json({
        status: "success",
        count: areas.length,
        data: { areas }
    });
});

exports.getArea = catchAsync(async (req, res, next) => {
    // eslint-disable-next-line prefer-destructuring
    const id = req.params.id;
    const area = await areaRepo.getById(id);

    if(!area) {
        return next(new AppError("No branch found with that id!", 404));
    }

    res.status(200).json({
        status: 'success',
        data: { area }
    });
});

exports.setCityId = (req, res, next) => {
    // allow nested routes
    if(!req.body.city) req.body.city = req.params.cityId;
    
    next();
};

exports.createArea = controllerFactory.create(areaRepo);

exports.updateArea = controllerFactory.update(areaRepo);

exports.deleteArea = controllerFactory.delete(areaRepo);
