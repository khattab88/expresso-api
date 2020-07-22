/* eslint-disable prettier/prettier */
const Restaurant = require("../models/restaurant-model");

class RestaurantRepository {

  async getStats() {
    return await Restaurant.aggregate([
      // { 
      //   $match: { specialOffers: { $eq: true } }
      // },
      { 
        $group: {
          _id: "$rating", 
          num: { $sum: 1 },
          maxRating: { $max: "$rating" }, 
          minRating: { $min: "$rating" },
          avgRating: { $avg: "$rating" }
        }
      },
      { 
        $sort: { maxRating: -1 } 
      }
    ]);  

}

    async getCount() {
        return await Restaurant.countDocuments();
    }

    async getAll() {
        try {
          const restaurants = await Restaurant.find();
          return restaurants; 
        }
        catch(err) {
          throw new Error(err);
        }
    }

    async getById(id) {
        try {
          const menu = await Restaurant.findOne({ id: id });
          return menu;
        }
        catch(err) {
          throw new Error(err);
        }
      }
    
      async create(restaurant) {
        try {
          const newRestaurant = await Restaurant.create(restaurant);
          return newRestaurant;
        }
        catch (err) {
          throw new Error(err);
        }
      }
    
      async update(id, restaurant) {
        try {
          const updated = await Restaurant.findOneAndUpdate({ id: id }, restaurant, { 
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
          await Restaurant.findOneAndDelete({ id: id });
        }
        catch (err) {
          throw new Error(err);
        }
      }
}

module.exports = new RestaurantRepository();