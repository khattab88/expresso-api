/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable prettier/prettier */
const fs = require('fs');
const path = require('path');

const Tag = require("../models/tag-model");


class TagRepository {

  query(filter, sortBy, fields) {
    try {
      let query = null;

      // 1) basic filtering
      const excluded = ["sort", "page", "limit", "fields"];
      excluded.forEach(field => delete filter[field]);

      // 2) advanced filtering
      // let queryStr = JSON.stringify(filter);
      // queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
      // filter = JSON.parse(queryStr);

      // CREATE QUERY OBJECT
      query = Tag.find(filter);
      /// const query = Tag.find().where("name").equals("Offers");

      // 3) sorting
      if(sortBy) {
        sortBy = sortBy.split(',').join(' ');
        query.sort(sortBy);
      } else {
        // default sorting
        query = query.sort("name");
      }

      // 4) projecting
      if(fields) {
        fields = fields.split(",").join(" ");
        query.select(fields);
      } else {
        const excludedFields = ["-_id", "-__v"].join(" ");
        query = query.select(excludedFields);
      }

      return query;
    } 
    catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }

  async getAll(filter, sortBy, fields) {
    try {
      // excecute query
      const tags = await this.query(filter, sortBy, fields);
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
