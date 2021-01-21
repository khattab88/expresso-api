/* eslint-disable prettier/prettier */
const express = require('express');
const router = express.Router();

const menuItemController = require('../controllers/menuItem-controller');
const authController = require('../controllers/auth-controller');

router
    .route('/')
    .get(menuItemController.getAllMenuItems)
    .post(authController.protect, authController.restrictTo("admin"),
          menuItemController.createMenuItem);

router
    .route("/:id")
    .get(menuItemController.getMenuItem)
    .patch(authController.protect, authController.restrictTo("admin"),
           menuItemController.updateMenuItem)
    .delete(authController.protect, authController.restrictTo("admin"),
            menuItemController.deleteMenuItem);

module.exports = router;