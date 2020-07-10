const tagRepo = require("../repositories/tag-repository");


exports.checkId = (req, res, next, val) => {
    const id = val;
    const tag = tagRepo.getById(id);

    if(!tag) {
        return res.status(404).json({
            status: "fail",
            message: "not found"
        });
    } 

    next();
};

exports.checkBody = (req, res, next) => {
    if(!req.body.name) {
        return res.status(400).json({
            status: "fail",
            message: "missing name field"
        });
    }

    next();
};


exports.getAllTags = (req, res) => {

    const tags = tagRepo.getAll();

    res.status(200).json({
        status: "success",
        count: tags.length,
        data: {
            tags: tags
        }
    });
};

exports.getTag = (req, res) => {
    const id = req.params.id;
    const tag = tagRepo.getById(id);

    res.status(200).json({
        status: "success",
        data: {
            tag: tag
        }
    });
};

exports.createTag = (req, res) => {
    const newTag = tagRepo.create(req.body);

    res.status(201).json({
        status: "success",
        data: {
            tag: newTag
        }
    });
};

exports.updateTag = (req, res) => {
    const id = req.params.id;
    const tag = tagRepo.getById(id);

    const updated = Object.assign(tag, req.body);
    tagRepo.update(updated);
    
    res.status(200).json({
        status: "success",
        data: {
            tag: updated
        }
    });
};

exports.deleteTag = (req, res) => {
    const id = req.params.id;
    const tag = tagRepo.getById(id);

    tagRepo.delete(id);

    res.status(204).json({
        status: "success",
        data: null
    });
};