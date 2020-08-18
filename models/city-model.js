/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const slugify = require('slugify');
const validator = require('validator');

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
    country: {
        name: {
            type: String,
            required: [true, 'Country must have a name!'],
            unique: false,
        },
    },
    areas: [
        {
            id: {
                type: String,
                default: uuidv4,
                unique: true,
              },
            name: {
                type: String,
                required: [true, 'Area must have a name!'],
                trim: true,
                unique: true,
            }
        }
    ]
});

// Document middleware: runs BEFORE .save() and .create()
citySchema.pre("save", function(next) {
    // eslint-disable-next-line prefer-destructuring
    this.slug = slugify(this.name, {
        lower: true,
        remove: /[*+~.()'"!:@]/g 
    });
    next();
});

const City = mongoose.model("city", citySchema);

module.exports = City;