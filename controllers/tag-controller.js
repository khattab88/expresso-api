/* eslint-disable prefer-const */
/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable prefer-destructuring */
/* eslint-disable prettier/prettier */
const QueryBuilder = require('../repositories/query-builder');
const Tag = require('../models/tag-model');
const tagRepo = require('../repositories/tag-repository');
const controllerFactory = require("./controller-factory");

/* OBSOLETE */
exports.checkId = (req, res, next, val) => {
  const id = val;
  const tag = tagRepo.getById(id);

  if (!tag) {
    return res.status(404).json({
      status: 'fail',
      message: 'not found',
    });
  }

  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({
      status: 'fail',
      message: 'missing name field',
    });
  }

  next();
};

exports.getPopularTags = async (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "name";
  req.query.fields = "id,name";

  next();
};

exports.getAllTags = controllerFactory.getAll(Tag, tagRepo);

exports.getTag = controllerFactory.getById(tagRepo);

exports.createTag = controllerFactory.create(tagRepo);

exports.updateTag = controllerFactory.update(tagRepo);

exports.deleteTag = controllerFactory.delete(tagRepo);
