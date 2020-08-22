/* eslint-disable prettier/prettier */
const Country = require("../models/country-model");
const Repository = require("./repository");

class CountryRepository extends Repository{
  constructor() { 
    super(Country); 
  }
}

module.exports = new CountryRepository();