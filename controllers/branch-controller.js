/* eslint-disable prefer-destructuring */
/* eslint-disable prettier/prettier */

// const Branch = require("../models/branch-model");
const { Branch, Tag } = require("expresso-models");
// const branchRepo = require('../repositories/branch-repository');
const { branchRepository: branchRepo } = require('expresso-repositories');

const catchAsync = require("../utils/catch-async");
const AppError = require("../utils/app-error");
const controllerFactory = require("./controller-factory");

exports.getAllBranches = catchAsync(async (req, res, next) => {
    let branches = null;

    if(req.params.restaurantId) {
        branches = await branchRepo.getByRestaurantId(req.params.restaurantId);
    }
    else if(req.params.areaId) {
        branches = await Branch.find({ "area.id": req.params.areaId });
    } 
    else {
        branches = await branchRepo.getAll();
    }

    for(let branch of branches) {
        const tagPromises = branch.restaurant.tags.map(async tag => await Tag.findOne({ "id": tag }));

        branch.restaurant.tags = await Promise.all(tagPromises);
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

exports.getDistancesFrom = catchAsync(async (req, res, next) => {
    const { unit, location } = req.params;
    const [ lat, lng ] = location.split(",");

    const multiplier = unit === "mi" ? 0.000621371 : 0.001;

    if(!lat || !lng) return next(new AppError("Please provide a valid location in this format lat,lng!", 400));

    const distances = [];
    // const distances = await Branch.aggregate([
    //     {
    //         $geoNear: {
    //             near: {
    //                 type: "Point",
    //                 coordinates: [lng * 1, lat * 1]
    //             },
    //             distanceField: "distance",
    //             distanceMultiplier: multiplier
    //         }
    //     },
    //     {
    //         $project: {
    //             id: 1,
    //             name: 1,
    //             distance: 1,
    //             _id: 0
    //         }
    //     }
    // ]);

    res.status(200).json({
        status: "success",
        data: { 
            distances
        }
    });
});