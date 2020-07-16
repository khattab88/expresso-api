/* eslint-disable prettier/prettier */
/* eslint-disable import/newline-after-import */
/* eslint-disable prettier/prettier */
const express = require('express');
const router = express.Router();

const tagController = require('../controllers/tag-controller');

// router.param('id', tagController.checkId);

router.route("/popular").get(tagController.getPopularTags, tagController.getAllTags);

router
  .route('/')
  .get(tagController.getAllTags)
  .post(tagController.checkBody, tagController.createTag);

router
  .route('/:id')
  .get(tagController.getTag)
  .patch(tagController.checkBody, tagController.updateTag)
  .delete(tagController.deleteTag);

module.exports = router;
