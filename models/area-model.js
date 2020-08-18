/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const slugify = require('slugify');
const validator = require('validator')

const areaSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'Area must have a name!'],
        trim: true,
        unique: false,
        maxlength: [50, "Area must have less than or equal 50 characters!"]
    },
    slug: {
        type: String,
        validate: {
            validator: (val) => validator.isSlug(val),
            message: "slug ({VALUE}) is not a valid slug!"
        }
    },
    city: {
        name: String,
        country: {
            name: String
        }
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Document middleware: runs BEFORE .save() and .create()
areaSchema.pre("save", function(next) {
    // eslint-disable-next-line prefer-destructuring
    this.slug = slugify(this.name, {
        lower: true,
        remove: /[*+~.()'"!:@]/g 
    });
    next();
});

const Area = mongoose.model("Area", areaSchema);

module.exports = Area;