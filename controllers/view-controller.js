const catchAsync = require("../utils/catch-async");
const AppError = require("../utils/app-error");

/* Checkout (ONLY FOR TESTING) */
exports.checkout = catchAsync(async (req, res, next) => {
    res.status(200).render("checkout", {
        title: "Checkout",
        orderId: req.params.orderId
    });
});