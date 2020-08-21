/* eslint-disable import/newline-after-import */
/* eslint-disable prettier/prettier */
const express = require('express');
const router = express.Router();

const restaurantController = require('../controllers/restaurant-controller');
const authController = require('../controllers/auth-controller');

const branchRouter = require('./branch-routes');

// GET /restaurants/35kjh0/branches
// POST /restaurants/35kjh0/branches
router.use("/:restaurantId/branches", branchRouter);

router
    .route("/top/:count")
    .get(authController.protect, restaurantController.getTopRating);

router
    .route("/stats")
    .get(authController.protect, restaurantController.getStats);

router
    .route("/")
    .get(authController.protect, restaurantController.getAllRestaurants)
    .post(authController.protect, authController.restrictTo("admin"),
          restaurantController.createRestaurant);

router
    .route("/:id")
    .get(authController.protect, restaurantController.getRestaurant)
    .patch(authController.protect, authController.restrictTo("admin"),
           restaurantController.updateRestaurant);

module.exports = router;