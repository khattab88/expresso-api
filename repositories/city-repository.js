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

class CityRepository {

  async getAll() {
    try {
      const cities = await City.find();
      return cities; 
    }
    catch(err) {
      throw new Error(err);
    }
  }

  async getById(id) {
    try {
      const city = await City.findOne({ id: id });
      return city;
    }
    catch(err) {
      throw new Error(err);
    }
  }
}

module.exports = new CityRepository();
