const Entity = require("./entity");

class City extends Entity {
    constructor (id, name, country, areas) {
        super(id);
        this.name = name;
        this.country = country;
        this.areas = areas;
    }
}

module.exports = City;