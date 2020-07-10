const express = require("express");
const router = express.Router();

const cityController = require("../controllers/city-controller");

router.route("/")
        .get(cityController.getAllCities);

router.route("/:id")
        .get(cityController.getCity);


module.exports = router;