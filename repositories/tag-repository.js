/* eslint-disable prefer-destructuring */
/* eslint-disable one-var */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable prettier/prettier */
const Tag = require("../models/tag-model");


class TagRepository {

  async getCount() {
    return await Tag.countDocuments();
  }

  async getAll(query) {
    try {
      const tags = await Tag.find(query);
      return tags; 
    }
    catch(err) {
      throw new Error(err);
    }
  }

  async getById(id) {
    try {
      const tag = await Tag.findOne({ id: id });
      return tag;
    }
    catch(err) {
      throw new Error(err);
    }
  }

  async create(tag) {
    try {
      const newTag = await Tag.create({ name: tag.name });
      return newTag;
    }
    catch (err) {
      throw new Error(err);
    }
  }

  async update(id, tag) {
    try {
      const updated = await Tag.findOneAndUpdate({ id: id }, tag, { 
        new: true,
        runValidators: true
      });
      return updated;
    }
    catch (err) {
      throw new Error(err);
    }
  }

  async delete(id) {
    try {
      await Tag.findOneAndDelete({ id: id });
    }
    catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = new TagRepository();
