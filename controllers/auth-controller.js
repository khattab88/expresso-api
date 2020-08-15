/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable prefer-destructuring */
/* eslint-disable prettier/prettier */
const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const userRepo = require("../repositories/user-repository");
const catchAsync = require("../utils/catch-async");
const AppError = require("../utils/app-error");
const sendEmail = require("../utils/email");


const signToken = id => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES
    });
};

exports.signup = catchAsync(async (req, res) => {
    // const newUser = await userRepo.create({
    //     firstName: req.body.firstName,
    //     lastName: req.body.lastName,
    //     email: req.body.email,
    //     password: req.body.password,
    //     passwordConfirm: req.body.passwordConfirm,
    //     passwordChangedAt: req.body.passwordChangedAt
    // });

    const newUser = await userRepo.create(req.body);

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

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        // Roles: ["user", "admin"]
        if(!roles.includes(req.user.role)) return next(new AppError("You don't have a sufficient permission!", 403));

        next();
    };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
    // 1. get user based on posted Email
    const user = await userRepo.getByEmail(req.body.email);
    if(!user) return next(new AppError("There is no user with such email address!", 404));

    // 2. generate reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // 3. send generated token via email
    const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/auth/resetPassword/${resetToken}`;

    const message = `Forgot your password? Submit a PATCH request with your new password and password confirm to ${resetUrl}.
                    \nIf you did't forget your password, please ignore this email.`;

    const mailOptions = {
        email: user.email,
        subject: "Your password reset token (valid for 10 minutes)",
        message: message
    };

    try {
        await sendEmail(mailOptions);

        res.status(200).json({
            status: 'success',
            message: 'Reset token sent to user email.'
        });
    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new AppError("Error occured while sending email to user, please try again later!", 500));
    }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
    // 1. get user based on reset token value
    const resetToken = req.params.token;
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    
    const user = await userRepo.getByFieldValue({passwordResetToken: hashedToken});

    if(!user) {
        return next(new AppError("Invalid token!", 400));
    }

    if(user.passwordResetExpires < Date.now()) {
        return next(new AppError("Expired token!", 400));
    }

    // 2. if user exists && token is not expired => set the new password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.save();

    // 3. update passwordChangedAt property for user

    // 4. log user in, send JWT
    const jwtToken = signToken(user.id);

    res.status(200).json({
        status: 'success',
        token: jwtToken,
        //data: { user }
    }); 
});