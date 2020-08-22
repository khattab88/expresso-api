/* eslint-disable prettier/prettier */
/* eslint-disable import/newline-after-import */
/* eslint-disable prettier/prettier */
const express = require('express');
const router = express.Router({ mergeParams: true });

const areaController = require('../controllers/area-controller');
const authController = require('../controllers/auth-controller');

router
    .route("/")
    .get(authController.protect, areaController.getAllAreas)
    .post(authController.protect, authController.restrictTo("admin"),
          areaController.setCityId, areaController.createArea);

router
    .route("/:id")
    .get(authController.protect, areaController.getArea)
    .patch(authController.protect, authController.restrictTo("admin"), 
           areaController.updateArea)
    .delete(authController.protect, authController.restrictTo("admin"), 
            areaController.deleteArea);

module.exports = router;