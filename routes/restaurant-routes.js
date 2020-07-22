/* eslint-disable prettier/prettier */
const express = require('express');
const router = express.Router();

const restaurantController = require('../controllers/restaurant-controller');

router
    .route("/top/:count")
    .get(restaurantController.getTopRating);

router
    .route("/stats")
    .get(restaurantController.getStats);

router
    .route("/")
    .get(restaurantController.getAllRestaurants)
    .post(restaurantController.createRestaurant);

module.exports = router;