/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const User = require('./user-model');
const OrderItem = require('./orderItem-model');

const orderSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Object,
        required: [true, "Order must be associated with a user!"]
    },
    orderItems: Array
});

// embed user as a child document
orderSchema.pre("save", async function (next) {
    const user = await User.findOne({ id: this.user });
    this.user = user;

    next();
});

// embed order items collection as a child documents
orderSchema.pre("save", async function(next) {
    const oredrItemPromises = this.orderItems.map(async id => await OrderItem.findOne({ id: id }));
    this.orderItems = await Promise.all(oredrItemPromises);

    // eslint-disable-next-line no-return-assign
    this.orderItems.forEach(oi => oi.order = undefined);

    next();
});


const Order = mongoose.model("Order", orderSchema);

module.exports = Order;