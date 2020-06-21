const express = require("express");
const router = express.Router();

const tagRepo = require("../repositories/tag-repository");

router.get("/api/tags", (req, res, next) => {
    const tags = tagRepo.get();
    res.json(tags);
});

module.exports = router;
