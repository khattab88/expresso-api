const Entity = require("./entity");

class Country extends Entity {
    constructor (id, name) {
        super(id);
        this.name = name;
    }
}

module.exports = Country;