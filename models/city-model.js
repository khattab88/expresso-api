/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const slugify = require('slugify');
const validator = require('validator');

const Country = require('./country-model');
const Area = require('./area-model');

const citySchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true,
      },
    name: {
        type: String,
        required: [true, 'City must have a name!'],
        trim: true,
        unique: true,
    },
    slug: {
        type: String,
        validate: {
            validator: (val) => validator.isSlug(val),
            message: "slug ({VALUE}) is not a valid slug!"
        }
    },
    country: Object,
    areas: Array
});

// Document middleware: runs BEFORE .save() and .create()

// create name slug
citySchema.pre("save", function(next) {
    // eslint-disable-next-line prefer-destructuring
    this.slug = slugify(this.name, {
        lower: true,
        remove: /[*+~.()'"!:@]/g 
    });

    next();
});

// embed country object as a child document
citySchema.pre("save", async function(next) {
    const country = await Country.findOne({ id: this.country });
    this.country = country;

    next();
});

// embed areas collection as a child documents
citySchema.pre("save", async function(next) {
    const areaPromises = this.areas.map(async id => await Area.findOne({ id: id }));
    this.areas = await Promise.all(areaPromises);

    // eslint-disable-next-line no-return-assign
    //this.areas.forEach(area => area.city = undefined);

    next();
});

const City = mongoose.model("City", citySchema);

module.exports = City;