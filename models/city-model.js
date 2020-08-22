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
    this.areas.forEach(area => area.city = undefined);

    next();
});


// calculate number of cities by country (as static function)
citySchema.statics.getNumOfCities = async function(countryId) {
    const stats = await this.aggregate([
        {
            $match: { "country.id": countryId }  
        },
        {
            $group: {
                _id: "$country.id",
                numOfCities: { $sum: 1 }
            }
        }
    ]);

    //console.log(stats);

    if(stats.length > 0) {
        await Country.findOneAndUpdate({ id: countryId }, { numOfCities: stats[0].numOfCities });
    } else {
        await Country.findOneAndUpdate({ id: countryId }, { numOfCities: 0 });
    }
};

citySchema.post("save", function() {
    this.constructor.getNumOfCities(this.country.id);
});


// query middleware hooks for findOneAndUpdate / findOneAndDelete 
citySchema.pre(/^findOneAnd/, async function(next) {
    this.cityDoc = await this.findOne();
    //console.log(city);
    next();
});

citySchema.post(/^findOneAnd/, async function() {
    this.cityDoc.constructor.getNumOfCities(this.cityDoc.country.id);
});

const City = mongoose.model("City", citySchema);

module.exports = City;