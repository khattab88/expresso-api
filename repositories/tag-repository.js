const Tag = require("../core/entities/tag");

const fs = require('fs');
const path =require('path');

class TagRepository {
    constructor () {
        this.dataFile = path.join(__dirname, "../data/tag-data.json");
        this.tags = JSON.parse(fs.readFileSync(this.dataFile));
    }

    getAll() {
        return this.tags;
    }

    getById(id) { 
        return this.tags.find(tag => tag.id === id);
    }

    create(tag) {
        const newId = ((+this.tags[this.tags.length - 1].id) + 1).toString();

        const newTag = Object.assign({id: newId}, tag);
        
        this.tags.push(newTag);
        this.save(this.tags);

        return newTag;
    }

    update(tag) {
        const index = this.tags.findIndex(t => t.id === tag.id);

        this.tags.splice(index, 1, tag);

        this.save(this.tags);
    }

    delete(id) {
        const index = this.tags.findIndex(t => t.id === id);

        this.tags.splice(index, 1);

        this.save(this.tags);
    }

    save(tags) {
        fs.writeFile(this.dataFile, JSON.stringify(tags, null, 4), err => {
            if(err) throw new Error(err);
        });
    }

    
    /* OBSOLETE */
    get () {
        return [
            new Tag("1", "Offers"),
            new Tag("2", "American"),
            new Tag("3", "Arabic"),
            new Tag("4", "Asian"),
            new Tag("5", "Bakery"),
            new Tag("6", "Beverages"),
            new Tag("7", "Burgers"),
            new Tag("8", "Coffee"),
            new Tag("9", "Desserts"),
            new Tag("10", "European"),
            new Tag("11", "Fast Food"),
            new Tag("12", "Healthy"),
            new Tag("13", "Indian"),
            new Tag("14", "Italian"),
            new Tag("15", "Latin"),
            new Tag("16", "Middle Eastern"),
            new Tag("17", "Pizza"),
            new Tag("18", "Salads"),
            new Tag("19", "Sandwiches"),
            new Tag("20", "Sea Food"),
            new Tag("21", "Turkish"),
            new Tag("22", "Vegan")
        ];
    }
}

module.exports = new TagRepository(); 