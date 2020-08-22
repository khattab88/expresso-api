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

exports.getBranch = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const branch = await branchRepo.getById(id);

    if(!branch) {
        return next(new AppError("No branch found with that id!", 404));
    }

    res.status(200).json({
        status: 'success',
        data: { branch }
    });
});

exports.createBranch = catchAsync(async (req, res, next) => {
    // allow nested routes
    if(!req.body.restaurant) req.body.restaurant = req.params.restaurantId;

    const newBranch = await branchRepo.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
          branch: newBranch,
        }
    });
});

exports.updateUser = catchAsync(async (req, res, next) => {
    const updated = await branchRepo.update(req.params.id, req.body);

    if(!updated) {
        return res.status(404).json({ 
            status: "fail",
            message: "not found!"
        });
      }
    
      res.status(200).json({
        status: 'success',
        data: {
          branch: updated,
        }
      });
});

exports.deleteBranch = controllerFactory.delete(branchRepo);