/* eslint-disable prettier/prettier */
/* eslint-disable import/newline-after-import */
/* eslint-disable prettier/prettier */
const express = require('express');
const router = express.Router({ mergeParams: true });

const branchRouter = require('./branch-routes');

const areaController = require('../controllers/area-controller');
const authController = require('../controllers/auth-controller');

// GET /areas/35kjh0/branches
// POST /areas/35kjh0/branches
router.use("/:areaId/branches", branchRouter);

router
    .route("/")
    .get(areaController.getAllAreas)
    .post(authController.protect, authController.restrictTo("admin"),
          areaController.setCityId, areaController.createArea);

router
    .route("/:id")
    .get(areaController.getArea)
    .patch(authController.protect, authController.restrictTo("admin"), 
           areaController.updateArea)
    .delete(authController.protect, authController.restrictTo("admin"), 
            areaController.deleteArea);

module.exports = router;