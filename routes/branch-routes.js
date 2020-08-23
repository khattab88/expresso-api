/* eslint-disable prettier/prettier */
/* eslint-disable import/newline-after-import */
/* eslint-disable prettier/prettier */
const express = require('express');
const router = express.Router({ mergeParams: true});

const branchController = require('../controllers/branch-controller');
const authController = require('../controllers/auth-controller');


//  /branches/within/5/km/center/29.986994,31.149467
router
    .route("/within/:distance/:unit/center/:location")
    .get(branchController.getBranchesWithin);

router
    .route("/distances/in/:unit/from/:location")
    .get(branchController.getDistancesFrom);

router
    .route("/")
    .get(branchController.getAllBranches)
    .post(authController.protect, authController.restrictTo("admin"),
          branchController.setRestaurantId, branchController.createBranch);

router
    .route("/:id")
    .get(branchController.getBranch)
    .patch(authController.protect, authController.restrictTo("admin"),
           branchController.updateUser)
    .delete(authController.protect, authController.restrictTo("admin"),
            branchController.deleteBranch);

module.exports = router;