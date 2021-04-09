/* eslint-disable prettier/prettier */
/* eslint-disable import/newline-after-import */
/* eslint-disable prettier/prettier */
const express = require('express');
const router = express.Router({ mergeParams: true });

const addressController = require('../controllers/address-controller');
const authController = require('../controllers/auth-controller');

router.use(authController.protect);

router
    .route("/")
    .get(addressController.getAllAddresses)
    .post(addressController.createAddress);

router
    .route("/:id")
    .get(addressController.getAddress)
    .patch(addressController.updateAddress)
    .delete(addressController.deleteAddress);

module.exports = router;