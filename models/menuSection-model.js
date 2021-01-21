/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const Menu = require("./menu-model");
const MenuItem = require("./menuItem-model");

const menuSectionSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true,
    },
    name: {
        type: String,
        required: [true, "Menu Section must have a name!"]
    },
    menu: {
        type: mongoose.Schema.ObjectId,
        ref: "Menu",
        required: [true, "Menu Section must be associated with a menu!"]
    },
    menuItems: Array
});


// // embed menu object as a child document
// menuSectionSchema.pre("save", async function(next) {
//     const menu = await Menu.findOne({ id: this.menu });
//     this.menu = menu;

//     next();
// });

// reference menu (parent) documnet vai populate()
menuSectionSchema.pre(/^find/, async function(next) {
    this.populate({
        path: "menu",
        select: "-__v -createdAt"
    });

    next();
});


// embed menu items collection as a child documents
// menuSectionSchema.pre("save", async function(next) {
//     const menuItemPromises = this.menuItems.map(async id => await MenuItem.findOne({ id: id }));
//     this.menuItems = await Promise.all(menuItemPromises);

//     // eslint-disable-next-line no-return-assign
//     this.menuItems.forEach(menuItem => menuItem.menuSection = undefined);

//     next();
// });

const MenuSection = mongoose.model("MenuSection", menuSectionSchema);

module.exports = MenuSection;