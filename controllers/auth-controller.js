/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable prefer-destructuring */
/* eslint-disable prettier/prettier */
const { promisify } = require('util');
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
        passwordConfirm: req.body.passwordConfirm,
        passwordChangedAt: req.body.passwordChangedAt
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

exports.protect = catchAsync(async (req, res, next) => {
    let token;

    // get token from authorization header
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token) return next(new AppError("You are not logged in!", 401));

    // verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    
    // check if user still exists
    const user = await userRepo.getById(decoded.id);
    if(!user) return next(new AppError("User is no longer exists", 401));

    // check if user changed password, after token issued
    if(user.hasPasswordChangedAfter(decoded.iat)) {
        return next(new AppError("User recently changed password, please login again!", 401));
    };

    // next() => grant access to protected route
    req.user = user;
    next();
});