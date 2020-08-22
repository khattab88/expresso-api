/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable import/newline-after-import */
/* eslint-disable prettier/prettier */
/* eslint-disable function-paren-newline */
/* eslint-disable class-methods-use-this */
/* eslint-disable-next-line prefer-destructuring */
const City = require('../models/city-model');
const Repository = require("./repository");

class CityRepository extends Repository {
  constructor() { 
    super(City); 
  }

  async getByCountryId(countryId) {
    try {
      const cities = await City.find({ "country.id": countryId });
      return cities;
    }
    catch(err) {
      throw new Error(err);
    }
  }
}

module.exports = new CityRepository();
