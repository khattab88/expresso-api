const express = require("express");
const router = express.Router();


const CityService = require("../core/services/city-service");

const citySvc = new CityService();

router.get("/cities", (req, res, next) => {
    res.json(citySvc.get());
});

module.exports = router;