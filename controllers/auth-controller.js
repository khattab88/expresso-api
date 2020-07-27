/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable prefer-destructuring */
/* eslint-disable prettier/prettier */
const jwt = require('jsonwebtoken');

const userRepo = require("../repositories/user-repository");
const catchAsync = require("../utils/catch-async");

exports.signup = catchAsync(async (req, res) => {
    const newUser = await userRepo.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES
    });

    res.status(201).json({
        status: 'success',
        token,
        data: { user: newUser }
    });
});
