/* eslint-disable prettier/prettier */
/* eslint-disable import/newline-after-import */
/* eslint-disable prettier/prettier */
const express = require("express");
const router = express.Router();

const cityController = require("../controllers/city-controller");
const authController = require('../controllers/auth-controller');

router.route("/")
        .get(authController.protect, cityController.getAllCities)
        .post(authController.protect, authController.restrictTo("admin"),
              cityController.createCity);

router.route("/:id")
        .get(authController.protect, cityController.getCity)
        .patch(authController.protect, authController.restrictTo("admin"), 
               cityController.updateCity)
        .delete(authController.protect, authController.restrictTo("admin"), 
                cityController.deleteCity);


module.exports = router;