/* eslint-disable prettier/prettier */
const Area = require("../models/area-model");

class AreaRepository {

    async getAll() {
        try {
            const areas = await Area.find();
            return areas;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getById(id) {
        try {
            const area = await Area.findOne({ id: id });
            return area;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getByCityId(cityId) {
      try {
        const cities = await Area.find({ "city.id": cityId });
        return cities;
      }
      catch(err) {
        throw new Error(err);
      }
    }

    async create(area) {
        try {
          const newArea = await Area.create(area);
          return newArea;
        }
        catch (err) {
          throw new Error(err);
        }
    }

    async update(id, area) {
        try {
          const updated = await Area.findOneAndUpdate({ id: id }, area, { 
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
          await Area.findOneAndDelete({ id: id });
        }
        catch (err) {
          throw new Error(err);
        }
      }
}

module.exports = new AreaRepository();