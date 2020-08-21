/* eslint-disable prettier/prettier */
const areaRepo = require('../repositories/area-repository');
const catchAsync = require("../utils/catch-async");
const AppError = require("../utils/app-error");

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

exports.createArea = catchAsync(async (req, res, next) => {
    // allow nested routes
    if(!req.body.city) req.body.city = req.params.cityId;

    const newArea = await areaRepo.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
          area: newArea,
        }
    });
});

exports.updateArea = catchAsync(async (req, res, next) => {
    const updated = await areaRepo.update(req.params.id, req.body);

    if(!updated) {
        return res.status(404).json({ 
            status: "fail",
            message: "not found!"
        });
      }
    
      res.status(200).json({
        status: 'success',
        data: {
          area: updated,
        }
      });
});

exports.deleteArea = catchAsync(async (req, res, next) => {
    const area = await areaRepo.getById(req.params.id);

    if(!area) return next(new AppError(`Area with id: ${req.params.id} is not found!`, 404));

    await areaRepo.delete(req.params.id);

    res.status(204).json({
        status: 'success',
        data: null,
    });
});

