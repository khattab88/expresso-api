/* eslint-disable import/newline-after-import */
/* eslint-disable prettier/prettier */
const express = require('express');
const router = express.Router();

const branchRouter = require('./branch-routes');

const restaurantController = require('../controllers/restaurant-controller');
const authController = require('../controllers/auth-controller');


// GET /restaurants/35kjh0/branches
// POST /restaurants/35kjh0/branches
router.use("/:restaurantId/branches", branchRouter);

router
    .route("/top/:count")
    .get(restaurantController.getTopRating);

router
    .route("/stats")
    .get(restaurantController.getStats);

router
    .route("/")
    .get(restaurantController.getAllRestaurants)
    .post(authController.protect, authController.restrictTo("admin"),
          restaurantController.createRestaurant);

router
    .route("/:id")
    .get(restaurantController.getRestaurant)
    .patch(authController.protect, authController.restrictTo("admin"),
           restaurantController.updateRestaurant)
    .delete(authController.protect, authController.restrictTo("admin"),
            restaurantController.deleteRestaurant);

module.exports = router;