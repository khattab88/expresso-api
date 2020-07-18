/* eslint-disable prefer-const */
/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable prefer-destructuring */
/* eslint-disable prettier/prettier */
const QueryBuilder = require('../repositories/query-builder');
const Tag = require('../models/tag-model');
const tagRepo = require('../repositories/tag-repository');


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

exports.getAllTags = async (req, res) => {
    try {
      // build query
      const query = new QueryBuilder(Tag.find(), req.query)
                        .filter()
                        .sort()
                        .project()
                        .paginate()
                        .limit().query; 

      // excecute query
      const tags = await tagRepo.getAll(query);

      // return resposne
      res.status(200).json({
        status: 'success',
        count: tags.length,
        data: {
          tags: tags,
        },
      });
    }
    catch(err) {
      res.status(500).json({
          status: "fail",
          message: err.message
      });
    }
};

exports.getTag = async (req, res) => {
  try {
    const id = req.params.id;
    const tag = await tagRepo.getById(id);

    if(!tag) {
        return res.status(404).json({
            status: "fail",
            message: "not found!"
        });
    }

    res.status(200).json({
      status: 'success',
      data: {
        tag: tag,
      },
    });
  }
  catch(err) {
      res.status(500).json({
          status: 'fail',
          message: err.message
      });
  }
};

exports.createTag = async (req, res) => {
    try {
        const newTag = await tagRepo.create(req.body);

        res.status(201).json({
          status: 'success',
          data: {
            tag: newTag,
          }
        });
    }
    catch(err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.updateTag = async (req, res) => {
    try {
        const updated = await tagRepo.update(req.params.id, req.body);

        if(!updated) {
            return res.status(404).json({ 
                status: "fail",
                message: "not found!"
            });
        }

        res.status(200).json({
          status: 'success',
          data: {
            tag: updated,
          }
        });
    }
    catch(err) {
        res.status(500).json({
            status: 'fail',
            message: err
        });
    }
};

exports.deleteTag = async (req, res) => {
    try {
        tagRepo.delete(req.params.id);

        res.status(204).json({
          status: 'success',
          data: null,
        });
    }
    catch(err) {
        res.status(404).json({
            status: 'fail',
            message: "not found!",
        });
    }
};
