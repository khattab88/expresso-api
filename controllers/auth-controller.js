/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable prefer-destructuring */
/* eslint-disable prettier/prettier */
const jwt = require('jsonwebtoken');

const userRepo = require("../repositories/user-repository");
const catchAsync = require("../utils/catch-async");
const AppError = require("../utils/app-error");

const signToken = id => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES
    });
};

exports.signup = catchAsync(async (req, res) => {
    const newUser = await userRepo.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });

    const token = signToken(newUser.id);

    res.status(201).json({
        status: 'success',
        token,
        data: { user: newUser }
    });
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password) return next(new AppError("Please provide email and password!", 400));

    const user = await userRepo.getByEmail(email);
    if(!user) return next(new AppError("Email not found!", 404));

    const correctPassword = await user.isCorrectPassword(user.password, password);
    if(!correctPassword) return next(new AppError("Wrong password entered!", 401));
    user.password = undefined;
    // console.log(user);

    const token = signToken(user.id);

    res.status(200).json({
        status: 'success',
        token: token,
        data: { user }
    });
});