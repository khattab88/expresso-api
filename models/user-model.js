/* eslint-disable prettier/prettier */
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
    password: {
        type: String,
        required: [true, "User must have a password!"],
        trim: true,
        minlength: [8, "Password must be at least 8 characters!"]
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
    }
});

/* Hashing passowrd */
userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;

    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;