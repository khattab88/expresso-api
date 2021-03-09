/* eslint-disable prettier/prettier */
/* eslint-disable import/newline-after-import */
/* eslint-disable prettier/prettier */
const express = require('express');
const router = express.Router({ mergeParams: true });

const menuItemOptionController = require('../controllers/menuItemOption-controller');
const authController = require('../controllers/auth-controller');

router
    .route('/')
    .get(menuItemOptionController.getAllMenuItemOptions)
    .post(authController.protect, authController.restrictTo("admin"),
          menuItemOptionController.createMenuItemOption);

router
    .route('/:id')
    .get(menuItemOptionController.getMenuItemOption)
    .patch(authController.protect, authController.restrictTo("admin"),
           menuItemOptionController.updateMenuItemOption)
    .delete(authController.protect, authController.restrictTo("admin"),
            menuItemOptionController.deleteMenuItemOption);

module.exports = router;
