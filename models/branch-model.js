/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const slugify = require('slugify');
const validator = require('validator');

const Area = require('./area-model');

const branchSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'Branch must have a name!'],
        trim: true,
        unique: false,
        maxlength: [50, "Branch must have less than or equal 50 characters!"]
    },
    slug: {
        type: String,
        validate: {
            validator: (val) => validator.isSlug(val),
            message: "slug ({VALUE}) is not a valid slug!"
        }
    },
    area: Object,
    restaurant: {
        //type: String,
        type: mongoose.Schema.ObjectId,
        ref: "Restaurant"
    }
});

// Document middleware: runs BEFORE .save() and .create()
branchSchema.pre("save", function(next) {
    // eslint-disable-next-line prefer-destructuring
    this.slug = slugify(this.name, {
        lower: true,
        remove: /[*+~.()'"!:@]/g 
    });
    next();
});

// embed area as a child document
branchSchema.pre("save", async function(next) {
    const area = await Area.findOne({ id: this.area });
    this.area = area;

    next();
});

const Branch = mongoose.model("Branch", branchSchema);

module.exports = Branch;