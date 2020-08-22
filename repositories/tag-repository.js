/* eslint-disable prefer-destructuring */
/* eslint-disable one-var */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable prettier/prettier */
const Tag = require("../models/tag-model");
const Repository = require("./repository");

class TagRepository extends Repository {
  constructor() { 
    super(Tag); 
  }

  async getCount() {
    return await Tag.countDocuments();
  }
}

module.exports = new TagRepository();
