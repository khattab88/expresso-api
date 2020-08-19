/* eslint-disable prettier/prettier */
/* eslint-disable import/newline-after-import */
/* eslint-disable prettier/prettier */
const express = require('express');
const router = express.Router();

const branchController = require('../controllers/branch-controller');

router
    .route("/")
    .get(branchController.getAllBranches)
    .post(branchController.createBranch);

router
    .route("/:id")
    .get(branchController.getBranch)
    .patch(branchController.updateUser)
    .delete(branchController.deleteBranch);

module.exports = router;