/* eslint-disable prettier/prettier */
/* eslint-disable import/newline-after-import */
/* eslint-disable prettier/prettier */
const express = require('express');
const router = express.Router();

const tagController = require('../controllers/tag-controller');
const authController = require('../controllers/auth-controller');

//// router.param('id', tagController.checkId);

router
  .route("/popular")
  .get(authController.protect,
       tagController.getPopularTags, tagController.getAllTags);

router
  .route('/')
  .get(authController.protect, tagController.getAllTags)
  .post(authController.protect, authController.restrictTo("admin"),
        tagController.checkBody, tagController.createTag);

router
  .route('/:id')
  .get(authController.protect, tagController.getTag)
  .patch(authController.protect, authController.restrictTo("admin"),
         tagController.checkBody, tagController.updateTag)
  .delete(authController.protect, authController.restrictTo("admin"),
          tagController.deleteTag);

module.exports = router;
