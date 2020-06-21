const express = require("express");
const router = express.Router();

const cityRepo = require("../repositories/city-repository");

router.get("/api/cities", (req, res, next) => {
    const cities = cityRepo.get();
    res.json(cities);
});

router.get("/api/cities/:id", (req, res, next) => {
    const id = req.params.id;
    const city = cityRepo.get().find(c => c.id === id);

    if(!city) {
        res.status(404).json("Not found!");
        return;
    }

    res.json(city);
});

router.post("/api/cities", (req, res, next) => {
    const body = req.body;

    cityRepo.add({name: body.name});

     res.json("Created!");
});

module.exports = router;