/* eslint-disable prettier/prettier */

// const Restaurant = require('../models/restaurant-model');
const { Restaurant } = require("expresso-models");
// const restaurantRepo = require('../repositories/restaurant-repository');
const { restaurantRepository: restaurantRepo } = require('expresso-repositories');

const AppError = require('../utils/app-error');
const catchAsync = require('../utils/catch-async');
const controllerFactory = require("./controller-factory");

exports.getTopRating = async (req, res) => {
  try {
    const count = req.params.count * 1;

    const top = await restaurantRepo.getTopRating(count);

    res.status(200).json({
      status: 'success',
      count: top.length,
      data: {
        top: top,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getStats = async (req, res) => {
  try {
    const stats = await restaurantRepo.getStats();

    res.status(200).json({
      status: 'success',
      data: {
        stats: stats,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getAllRestaurants = controllerFactory.getAll(Restaurant, restaurantRepo);

exports.getRestaurant = controllerFactory.getById(restaurantRepo);

exports.createRestaurant = () => {

  controllerFactory.create(restaurantRepo);

  //TODO: create menu after restaurant creation

};

exports.updateRestaurant = controllerFactory.update(restaurantRepo);

exports.deleteRestaurant = controllerFactory.delete(restaurantRepo);