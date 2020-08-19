/* eslint-disable prettier/prettier */
/* eslint-disable import/newline-after-import */
/* eslint-disable prettier/prettier */
const express = require('express');
const router = express.Router();

const countryController = require('../controllers/country-controller');
const authController = require('../controllers/auth-controller');

router
    .route("/")
    .get(authController.protect, countryController.getAllCountries)
    .post(authController.protect, authController.restrictTo("admin"),
          countryController.createCountry);

router
    .route("/:id")
    .get(authController.protect, countryController.getCountry)
    .patch(authController.protect, authController.restrictTo("admin"), 
           countryController.updateCountry)
    .delete(authController.protect, authController.restrictTo("admin"),
            countryController.deleteCountry);

module.exports = router;