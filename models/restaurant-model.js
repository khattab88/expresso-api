/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const slugify = require('slugify');

const restaurantSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        // default: () => uuidv4(),
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'Restaurant must have a name!'],
        trim: true,
        unique: false,
    },
    slogan: {
        type: String,
        required: [true, 'Restaurant must have a slogan!'],
        trim: true,
        unique: false,
    },
    deliveryTime: Number,
    deliveryFee: Number,
    specialOffers: Boolean,
    rating: {
        type: Number,
        default: 0
    },
    tags: [String],
    slug: String,
    createdAt: {
        type: Date,
        default: new Date(),
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// virtual properties
restaurantSchema.virtual("deliveryRate").get(function() {
    return (this.deliveryFee / this.deliveryTime).toFixed(2);
});


// Document middleware: runs BEFORE .save() and .create()
restaurantSchema.pre("save", function(next) {
    // eslint-disable-next-line prefer-destructuring
    this.slug = slugify(this.name, {
        lower: true,
        remove: /[*+~.()'"!:@]/g 
    });
    next();
});

// Document middleware: runs AFTER .save() and .create()
restaurantSchema.post("save", function(doc, next) {
    // console.log(doc);
    next();
});

// Query middleware: runs BEFORE .find(), findOne() and findOneAnd...()
restaurantSchema.pre(/^find/, function(next) {
    // this.find({ specialOffers: { $ne: false } })
    next();
});

// Query middleware: runs AFTER .find(), findOne() and findOneAnd...()
restaurantSchema.post(/^find/, function(docs, next) {
    // console.log(docs);
    next();
});

// Aggregate middleware: runs BEFORE .aggregate()
restaurantSchema.pre("aggregate", function(next) {
    console.log(this.pipeline());
    next();
});


const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;