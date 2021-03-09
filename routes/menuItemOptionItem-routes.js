/* eslint-disable prettier/prettier */
/* eslint-disable import/newline-after-import */
/* eslint-disable prettier/prettier */
const express = require('express');
const router = express.Router({ mergeParams: true });

const menuItemOptionItemController = require('../controllers/menuItemOptionItem-controller');
const authController = require('../controllers/auth-controller');

router
    .route('/')
    .get(menuItemOptionItemController.getAllMenuItemOptionItems)
    .post(authController.protect, authController.restrictTo("admin"),
          menuItemOptionItemController.createMenuItemOptionItem);

router
    .route('/:id')
    .get(menuItemOptionItemController.getMenuItemOptionItem)
    .patch(authController.protect, authController.restrictTo("admin"),
           menuItemOptionItemController.updateMenuItemOptionItem)
    .delete(authController.protect, authController.restrictTo("admin"),
            menuItemOptionItemController.deleteMenuItemOptionItem);

module.exports = router;
