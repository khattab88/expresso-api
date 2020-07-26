/* eslint-disable prettier/prettier */
const cityRepo = require("../repositories/city-repository");

exports.getAllCities = async (req, res) => {
    const cities = await cityRepo.getAll();
    
    res.status(200).json({
        status: "success",
        count: cities.length,
        data: {
            cities: cities
        }
    });
};

exports.getCity = async (req, res) => {
    const id = req.params.id;
    const city = await cityRepo.getById(id);

    if(!city) {
        res.status(404).json("Not found!");
        return;
    }

    res.json(city);
};
