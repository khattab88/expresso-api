/* eslint-disable prettier/prettier */
/* eslint-disable import/newline-after-import */
/* eslint-disable prettier/prettier */
const express = require('express');
const router = express.Router();

const areaController = require('../controllers/area-controller');

router
    .route("/")
    .get(areaController.getAllAreas)
    .post(areaController.createArea);

router
    .route("/:id")
    .get(areaController.getArea)
    .patch(areaController.updateArea)
    .delete(areaController.deleteArea);

module.exports = router;