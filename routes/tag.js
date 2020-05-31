const express = require("express");
const router = express.Router();

const TagService = require("../core/services/tag-service");
const tagSvc = new TagService();

router.get("/api/tags", (req, res, next) => {
    const tags = tagSvc.get();
    res.json(tags);
});

module.exports = router;
