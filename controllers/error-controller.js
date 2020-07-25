/* eslint-disable prettier/prettier */
const AppError = require('../utils/app-error');

const HandleDbCastError = err => {
    const message = `invalid ${err.path}: ${err.value}`;
    return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
};

const sendErrorProd = (err, res) => {
    // Operational error
    if(err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    } 
    // Programming, Unknown error
    else {
        // eslint-disable-next-line no-console
        console.error("ERROR!", err);
        
        res.status(500).json({
            status: "error",
            message: "Something went wrong!"
        });
    }
};

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    if(process.env.NODE_ENV === "development") {
        // console.error(err);
        sendErrorDev(err, res);
    } 
    else if(process.env.NODE_ENV === "production") {
        let error = { ...err };
        if(err.name === "CastError") {
            error = HandleDbCastError(error);
        }

        sendErrorProd(error, res);
    }
};