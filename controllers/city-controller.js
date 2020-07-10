const cityRepo = require("../repositories/city-repository");


exports.getAllCities = (req, res) => {
    const cities = cityRepo.getAll();
    
    res.status(200).json({
        status: "success",
        count: cities.length,
        data: {
            cities: cities
        }
    });
};

exports.getCity = (req, res) => {
    const id = req.params.id;
    const city = cityRepo.get().find(c => c.id === id);

    if(!city) {
        res.status(404).json("Not found!");
        return;
    }

    res.json(city);
};
