const express = require("express");
const router = express.Router();

const CityService = require("../core/services/city-service");
const citySvc = new CityService();

router.get("/cities", (req, res, next) => {
    const cities = citySvc.get();
    res.json(cities);
});

router.get("/cities/:id", (req, res, next) => {
    const id = req.params.id;
    const city = citySvc.get().find(c => c.id === id);

    if(!city) {
        res.status(404).json("Not found!");
        return;
    }

    res.json(city);
});

router.post("/cities", (req, res, next) => {
    const body = req.body;

    citySvc.add({name: body.name});

     res.json("Created!");
});

module.exports = router;