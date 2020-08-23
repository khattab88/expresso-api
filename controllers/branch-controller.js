/* eslint-disable prefer-destructuring */
/* eslint-disable prettier/prettier */
const branchRepo = require('../repositories/branch-repository');
const catchAsync = require("../utils/catch-async");
const AppError = require("../utils/app-error");
const controllerFactory = require("./controller-factory");

exports.getAllBranches = catchAsync(async (req, res, next) => {
    let branches = null;

    if(req.params.restaurantId) {
        branches = await branchRepo.getByRestaurantId(req.params.restaurantId);
    } else {
        branches = await branchRepo.getAll();
    }

    res.status(200).json({
        status: "success",
        count: branches.length,
        data: { docs: branches }
    });
});

exports.getBranch = controllerFactory.getById(branchRepo);

exports.setRestaurantId = (req, res, next) => {
    // allow nested routes
    if(!req.body.restaurant) req.body.restaurant = req.params.restaurantId;

    next();
};

exports.createBranch = controllerFactory.create(branchRepo);

exports.updateUser = controllerFactory.update(branchRepo);

exports.deleteBranch = controllerFactory.delete(branchRepo);

exports.getBranchesWithin = catchAsync(async (req, res, next) => {
    const { distance, unit, location } = req.params;
    const [ lat, lng ] = location.split(",");

    const radius = unit === "mi" ? distance / 3963.2 : distance / 6378.1;

    if(!lat || !lng) return next(new AppError("Please provide a valid location in this format lat,lng!", 400));

    const branches = await branchRepo.getAll({ 
        location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } } 
    });

    res.status(200).json({
        status: "success",
        count: branches.length,
        data: { docs: branches }
    });
});