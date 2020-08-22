/* eslint-disable prettier/prettier */
const Restaurant = require('../models/restaurant-model');
const restaurantRepo = require('../repositories/restaurant-repository');
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

exports.getAllRestaurants = async (req, res) => {
    try {
      const restaurants = await restaurantRepo.getAll();
  
      // return resposne
      res.status(200).json({
        status: 'success',
        count: restaurants.length,
        data: {
          restaurants: restaurants,
        },
      });
    } catch (err) {
      res.status(500).json({
        status: 'fail',
        message: err.message,
      });
    }
};
  
exports.getRestaurant = catchAsync(async (req, res, next) => {
      const {id} = req.params;
      const restaurant = await restaurantRepo.getById(id);
      //const restaurant = await Restaurant.findOne({ id }).populate("branches");

      if(!restaurant) {
        return next(new AppError("No restaurant found with that id!", 404));
      }

      res.status(200).json({
        status: 'success',
        data: {
          restaurant: restaurant,
        },
      });
});

exports.createRestaurant = catchAsync( async (req, res, next) => {
  const newRestaurant = await restaurantRepo.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      restaurant: newRestaurant,
    }
  });
});

exports.updateRestaurant = catchAsync(async (req, res, next) => {
  const updated = await restaurantRepo.update(req.params.id, req.body);

  if(!updated) {
    return res.status(404).json({ 
        status: "fail",
        message: "not found!"
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      restaurant: updated,
    }
  });
});

exports.deleteRestaurant = controllerFactory.delete(restaurantRepo);