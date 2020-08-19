/* eslint-disable prettier/prettier */
/* eslint-disable import/newline-after-import */
/* eslint-disable prettier/prettier */
const express = require('express');
const router = express.Router();

const branchController = require('../controllers/branch-controller');
const authController = require('../controllers/auth-controller');

router
    .route("/")
    .get(authController.protect, branchController.getAllBranches)
    .post(authController.protect, authController.restrictTo("admin"),
          branchController.createBranch);

router
    .route("/:id")
    .get(authController.protect, branchController.getBranch)
    .patch(authController.protect, authController.restrictTo("admin"),
           branchController.updateUser)
    .delete(authController.protect, authController.restrictTo("admin"),
            branchController.deleteBranch);

module.exports = router;