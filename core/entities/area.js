const Entity = require("./entity");

class Area extends Entity {
    // eslint-disable-next-line no-unused-vars
    constructor (id, name, cityId = 0) {
        super(id);
        this.name = name;
    }
}

module.exports = Area;