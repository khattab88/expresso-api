/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const menuSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        // default: () => uuidv4(),
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'Menu must have a name!'],
        trim: true,
        unique: true,
    },
    restaurant: {
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
        "rating": {
            type: Number,
            default: true,
        },
        "tags": [String]
    }
    // TODO: complete the rest of fields...
});

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
