/* eslint-disable prettier/prettier */
const Restaurant = require('../models/restaurant-model');
const restaurantRepo = require('../repositories/restaurant-repository');

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
  
