/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const restaurantSchema = new mongoose.Schema({
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
    "tags": [String]
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;