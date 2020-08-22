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
        data: { docs: users }
    });
});

exports.getUser = controllerFactory.getById(userRepo);

exports.createUser = controllerFactory.create(userRepo);

exports.updateUser = controllerFactory.update(userRepo);

exports.deleteUser = controllerFactory.delete(userRepo);