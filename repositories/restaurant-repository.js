/* eslint-disable prettier/prettier */
const Restaurant = require("../models/restaurant-model");

class RestaurantRepository {

  async getTopRating(count) {
    return await Restaurant.aggregate([
      // {
      //   $group: {
      //     _id: "$name",
      //     rating: { $sum: "$rating" }
      //   }
      // },
      {
        $sort: { rating: -1 }
      },
      { $limit : count },
      // {
      //   $unwind: "$tags"
      // }
      { $addFields: { id: "$id", name: "$name" } },
      { $project: { id: 1, name: 1, rating: 1, _id: 0 } }
    ]);
  }

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
          const restaurant = await Restaurant.findOne({ id: id });
          return restaurant;
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