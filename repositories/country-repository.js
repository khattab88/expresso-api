/* eslint-disable prettier/prettier */
const Country = require("../models/country-model");

class CountryRepository {

    async getAll() {
        try {
            const countries = await Country.find();
            return countries;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getById(id) {
        try {
            const country = await Country.findOne({ id: id });
            return country;
        } catch (err) {
            throw new Error(err);
        }
    }

    async create(country) {
        try {
          const newCountry = await Country.create(country);
          return newCountry;
        }
        catch (err) {
          throw new Error(err);
        }
    }

    async update(id, country) {
        try {
          const updated = await Country.findOneAndUpdate({ id: id }, country, { 
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
          await Country.findOneAndDelete({ id: id });
        }
        catch (err) {
          throw new Error(err);
        }
      }
}

module.exports = new CountryRepository();