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
        data: { branches }
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