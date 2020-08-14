/* eslint-disable prettier/prettier */
const crypto = require('crypto');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true,
    },
    firstName: {
        type: String,
        required: [true, "User must have a first name!"],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, "User must have a last name!"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "User must have an email!"],
        trim: true,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Email is not valid!"]
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    password: {
        type: String,
        required: [true, "User must have a password!"],
        trim: true,
        minlength: [8, "Password must be at least 8 characters!"],
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, "User must have a password confirm!"],
        trim: true,
        validate: {
            // Only works on CREATE and SAVE.
            validator: function(value) {
                return this.password === value;
            },
            message: "Password confirm does not match password!"
        }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date
});

/* Hashing passowrd */
userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;

    next();
});

/* Compare passwords */
userSchema.methods.isCorrectPassword = async function (userPassword, candidatePassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

/* Check if password changed after issuing token */
userSchema.methods.hasPasswordChangedAfter = function (jwtTimestamp) {
    if(this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        // console.log(jwtTimestamp, changedTimestamp);
        const passwordChangedAfterToken = jwtTimestamp < changedTimestamp;
        return passwordChangedAfterToken;
    }

    // false means password not changed
    return false; 
};

userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.passwordResetExpires = Date.now() + (10 * 60 * 1000); // adds 10 minutes (as milliseconds)

    console.log({resetToken}, this.passwordResetToken);

    return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;