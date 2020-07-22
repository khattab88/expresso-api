/* eslint-disable prettier/prettier */
const express = require('express');
const router = express.Router();

const restaurantController = require('../controllers/restaurant-controller');

router
    .route("/stats")
    .get(restaurantController.getStats);

router
    .route("/")
    .get(restaurantController.getAllRestaurants);

module.exports = router;