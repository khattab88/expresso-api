const express = require("express");
const router = express.Router();

const tagController = require("../controllers/tag-controller");

router.param("id", tagController.checkId);

router.route("/")
        .get(tagController.getAllTags)
        .post(tagController.checkBody, tagController.createTag);

router.route("/:id")
        .get(tagController.getTag)
        .patch(tagController.checkBody, tagController.updateTag)
        .delete(tagController.deleteTag);

module.exports = router;
