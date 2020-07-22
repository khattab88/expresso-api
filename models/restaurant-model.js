/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

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
        unique: true,
    },
    slogan: {
        type: String,
        required: [true, 'Restaurant must have a slogan!'],
        trim: true,
        unique: true,
    },
    deliveryTime: Number,
    deliveryFee: Number,
    specialOffers: Boolean,
    rating: Number,
    tags: [String]
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// virtual properties
restaurantSchema.virtual("deliveryRate").get(function() {
    return (this.deliveryFee / this.deliveryTime).toFixed(2);
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;