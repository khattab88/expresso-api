/* eslint-disable prettier/prettier */
const express = require('express');
const router = express.Router({ mergeParams: true });

const menuController = require('../controllers/menu-controller');
const authController = require('../controllers/auth-controller');

router
    .route('/')
    .get(menuController.getAllMenus)
    .post(authController.protect, authController.restrictTo("admin"),
          menuController.createMenu);

router
    .route("/:id")
    .get(menuController.getMenu)
    .patch(authController.protect, authController.restrictTo("admin"),
           menuController.updateMenu)
    .delete(authController.protect, authController.restrictTo("admin"),
            menuController.deleteMenu);

module.exports = router;