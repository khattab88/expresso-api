/* eslint-disable prettier/prettier */
/* eslint-disable import/newline-after-import */
/* eslint-disable prettier/prettier */
const express = require('express');
const router = express.Router({ mergeParams: true });

const categoryController = require('../controllers/category-controller');
const authController = require('../controllers/auth-controller');

router
    .route('/')
    .get(categoryController.getAllCategories)
    .post(authController.protect, authController.restrictTo("admin"),
          categoryController.createCategory);

router
    .route('/:id')
    .get(categoryController.getCategory)
    .patch(authController.protect, authController.restrictTo("admin"),
           categoryController.updateCategory)
    .delete(authController.protect, authController.restrictTo("admin"),
            categoryController.deleteCategory);

module.exports = router;
