/* eslint-disable prettier/prettier */
const express = require('express');
const router = express.Router();

const menuSectionController = require('../controllers/menuSection-controller');
const authController = require('../controllers/auth-controller');


router
    .route('/')
    .get(menuSectionController.getAllMenuSections)
    .post(authController.protect, authController.restrictTo("admin"),
          menuSectionController.createMenuSection);

router
    .route("/:id")
    .get(menuSectionController.getMenuSection)
    .patch(authController.protect, authController.restrictTo("admin"),
           menuSectionController.updateMenuSection)
    .delete(authController.protect, authController.restrictTo("admin"),
            menuSectionController.deleteMenuSection);

module.exports = router;