/* eslint-disable prefer-destructuring */
/* eslint-disable prettier/prettier */
const catchAsync = require("../utils/catch-async");
const AppError = require("../utils/app-error");

// const QueryBuilder = require("../repositories/query-builder");
const { QueryBuilder } = require('expresso-repositories');

exports.getAll = (Model, repo) => catchAsync(async (req, res, next) => {
  try {
    // build query
    const query = new QueryBuilder(Model.find(), req.query)
      .filter()
      .sort()
      .project()
      .paginate()
      .limit().query;

    // excecute query
    const docs = await repo.getAll(query);

    // return resposne
    res.status(200).json({
      status: 'success',
      count: docs.length,
      data: { docs }
    });
  }
  catch (err) {
    console.log(err);

    res.status(500).json({
      status: "fail",
      message: err.message
    });
  }
});

exports.getById = repo => catchAsync(async (req, res, next) => {
  const doc = await repo.getById(req.params.id);

  if (!doc) {
    return next(new AppError("No document found with that id!", 404));
  }

  res.status(200).json({
    status: 'success',
    data: { doc }
  });
});


exports.create = repo => catchAsync(async (req, res, next) => {
  const newDoc = await repo.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      doc: newDoc,
    }
  });
});

exports.update = repo => catchAsync(async (req, res, next) => {
  const updated = await repo.update(req.params.id, req.body);

  if (!updated) return next(new AppError(`Document with id: ${req.params.id} is not found!`, 404));

  res.status(200).json({
    status: 'success',
    data: {
      doc: updated,
    }
  });
});

exports.delete = repo => catchAsync(async (req, res, next) => {
  const doc = await repo.getById(req.params.id);

  if (!doc) return next(new AppError(`Document with id: ${req.params.id} is not found!`, 404));

  await repo.delete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});