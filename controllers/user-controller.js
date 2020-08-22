/* eslint-disable prettier/prettier */
const User = require('../models/user-model');
const userRepo = require("../repositories/user-repository");
const catchAsync = require("../utils/catch-async");
const AppError = require("../utils/app-error");
const controllerFactory = require("./controller-factory");

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await userRepo.getAll();

    res.status(200).json({
        status: 'success',
        count: users.length,
        data: { users }
    });
});

exports.getUser = catchAsync(async (req, res, next) => {
    const user = await userRepo.getById(req.params.id);

    if(!user) {
        return next(new AppError("No user found with that id!", 404));
    }

    res.status(200).json({
        status: 'success',
        data: { user }
    });
});

exports.createUser = catchAsync(async (req, res, next) => {
    const newUser = await userRepo.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
          user: newUser,
        }
    });
});

exports.updateUser = controllerFactory.update(userRepo);

exports.deleteUser = controllerFactory.delete(userRepo);