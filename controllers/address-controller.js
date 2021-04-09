/* eslint-disable prettier/prettier */

const { Address } = require('expresso-models');
const { addressRepository: addressRepo } = require('expresso-repositories');

const catchAsync = require("../utils/catch-async");
const AppError = require("../utils/app-error");

const controllerFactory = require("./controller-factory");


exports.getAllAddresses = catchAsync(async (req, res, next) => {
    let addresses = null;

    if(req.params.userId) {
        addresses = await addressRepo.getByUserId(req.params.userId);
    } 
    else {
        addresses = await addressRepo.getAll();
    }

    res.status(200).json({
        status: "success",
        count: addresses.length,
        data: { docs: addresses }
    });
});

exports.getAddress = controllerFactory.getById(addressRepo);

exports.createAddress = controllerFactory.create(addressRepo);

exports.updateAddress = controllerFactory.update(addressRepo);

exports.deleteAddress = controllerFactory.delete(addressRepo);