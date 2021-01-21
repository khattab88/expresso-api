/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const Restaurant = require("./restaurant-model");
// const MenuSection = require("./menuSection-model");

const menuSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true,
    },
    // name: String,
    restaurant: {
        type: mongoose.Schema.ObjectId,
        ref: "Restaurant",
        required: [true, "Menu must be associated with an restaurant!"]
    },
    menuSections: Array
});


// // embed restaurant object as a child document
// menuSchema.pre("save", async function(next) {
//     const restaurant = await Restaurant.findOne({ id: this.restaurant });
//     this.restaurant = restaurant;

//     next();
// });

// reference restaurant (parent) documnet vai populate()
menuSchema.pre(/^find/, async function(next) {
    this.populate({
        path: "restaurant",
        select: "-__v -createdAt -menu"
    });

    next();
});

// embed menu sections collection as a child documents
// menuSchema.pre("save", async function(next) {
//     const menuSectionPromises = this.menuSections.map(async id => await MenuSection.findOne({ id: id }));
//     this.menuSections = await Promise.all(menuSectionPromises);

//     // eslint-disable-next-line no-return-assign
//     this.menuSections.forEach(menuSection => menuSection.menu = undefined);

//     next();
// });


const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
