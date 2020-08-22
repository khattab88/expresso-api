/* eslint-disable prettier/prettier */
const catchAsync = require("../utils/catch-async");
const AppError = require("../utils/app-error");

exports.delete = repo => catchAsync(async (req, res, next) => {
    const doc = await repo.getById(req.params.id);

    if(!doc) return next(new AppError(`Document with id: ${req.params.id} is not found!`, 404));

    await repo.delete(req.params.id);

    res.status(204).json({
        status: 'success',
        data: null,
    });
});