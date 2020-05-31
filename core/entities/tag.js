const Entity = require("./entity");

class Tag extends Entity {

    constructor (id, title) {
        super(id);
        this.title = title;
    }

}

module.exports = Tag;