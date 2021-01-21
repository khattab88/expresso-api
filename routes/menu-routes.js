/* eslint-disable prettier/prettier */
const express = require('express');
const router = express.Router();

const menuController = require('../controllers/menu-controller');

// router
//   .route('/')
//   .get(menuController.getAllMenus)
//   .post(menuController.checkBody, menuController.createMenu);

// router
//   .route('/:id')
//   .get(menuController.getMenu)
//   .patch(menuController.checkBody, menuController.updateMenu)
//   .delete(menuController.delete);

router
    .route('/')
    .get(menuController.getAllMenus);

module.exports = router;