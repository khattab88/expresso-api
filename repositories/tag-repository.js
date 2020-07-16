/* eslint-disable prefer-destructuring */
/* eslint-disable one-var */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable prettier/prettier */
const fs = require('fs');
const path = require('path');

const Tag = require("../models/tag-model");


class TagRepository {

  async query(filter, sortBy, fields, paging) {
    try {
      let query = null;

      // 1) basic filtering
      const excluded = ["sort", "fields", "page", "limit",];
      excluded.forEach(field => delete filter[field]);

      // 2) advanced filtering
      let queryStr = JSON.stringify(filter);
      queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
      filter = JSON.parse(queryStr);

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

      // 5) paging
      let page = 0, pageSize = 10, skip = 0;
      if(paging) {
        page = paging.page;
        pageSize = paging.pageSize;
        skip = page * pageSize;

        const count = await this.getCount();
        if(skip >= count) throw new Error("this page does not exist!");

        query = query.skip(skip).limit(pageSize);
      } else {
        // default paging
        // query = query.skip(skip).limit(pageSize); //(DISABLED)
      }

      /// query.sort().select().skip().limit()...
      return query;
    } 
    catch (err) {
      throw new Error(err);
    }
  }

  async getCount() {
    return await Tag.countDocuments();
  }

  async getAll(filter, sortBy, fields, paging) {
    try {
      // excecute query
      const tags = await this.query(filter, sortBy, fields, paging);
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
