/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable prefer-destructuring */
/* eslint-disable prettier/prettier */
const userRepo = require("../repositories/user-repository");
const catchAsync = require("../utils/catch-async");

exports.signup = catchAsync(async (req, res) => {
    const newUser = await userRepo.create(req.body);

    res.status(201).json({
        status: 'success',
        data: { user: newUser }
    });
});
