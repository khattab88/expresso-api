/* eslint-disable prettier/prettier */
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const catchAsync = require("../utils/catch-async");
const AppError = require("../utils/app-error");
const controllerFactory = require("./controller-factory");

// const Order = require("../models/order-model");
const { Order } = require('expresso-models');
// const orderRepo = require("../repositories/order-repository");
const { orderRepository: orderRepo, orderItemRepository: orderItemRepo, userRepository: userRepo } = require('expresso-repositories');


/* 
USING HERE AN OLD STRIPE API (V.7)
THE LINK BELOW FOR NEW API (V.8)
https://stripe.com/docs/payments/accept-a-payment?integration=elements
*/
exports.getCheckoutSession = catchAsync(async (req, res, next) => {
    // 1) get order
    const order = await orderRepo.getById(req.params.orderId);

    // 2) create checkout session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        success_url: `http://127.0.0.1:3000/orders/?order=${req.params.orderId}`,
        cancel_url: "http://127.0.0.1:3000/orders/",
        customer_email: req.user.email,
        client_reference_id: req.params.orderId,
        line_items: [{
            name: "test item",
            description: "test item desc",
            images: ["https://d160j2lijywtux.cloudfront.net/uploads/item/image_rectangle_mobile/1323136/Bundle-4-500x500.png"],
            amount: 30 * 100,
            currency: "usd",
            quantity: 3
        }]
        // line_items: order.orderItems.map(oi => {
        //     return 
        //     { 
        //         name: oi.menuItem.name,
        //         description: oi.menuItem.description,
        //         images: [`${oi.menuItem.image}`],
        //         amount: oi.menuItem.price * 100,
        //         currency: "usd",
        //         quantity: oi.quantity
        //     };
        // })
    });

    // 3) create session as response
    res.status(200).json({
        status: 'success',
        session
    });
});

/* TEMPORARY CODE */
exports.createCheckoutOrder = catchAsync(async (req, res, next) => {
    const { order } = req.query;

    if (!order) return next();

    await orderRepo.create(order);

    res.redirect(req.originalUrl.split("?")[0]);
});

exports.getAllOrders = catchAsync(async (req, res, next) => {
    let orders = [];

    if(req.params.userId) {
        const user = await userRepo.getById(req.params.userId);

        orders = await Order.find({ user: user._id });
    }

    res.status(200).json({
        status: "success",
        count: orders.length,
        data: { docs: orders }
    });
});

exports.createOrder = catchAsync(async (req, res, next) => {
    const orderData = req.body;

    //1. create order
    const order = await orderRepo.create(orderData);

    //2. create order items
    if (orderData.orderItems) {
        const orderItemsPromises = orderData.orderItems.forEach(async oi => {
            oi.order = order._id;
            await orderItemRepo.create(oi);
        });
    }

    res.status(201).json({
        status: "success",
        data: { doc: order }
    });
});

exports.getOrder = controllerFactory.getById(orderRepo);
exports.updateOrder = controllerFactory.update(orderRepo);