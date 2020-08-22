/* eslint-disable prettier/prettier */
const Restaurant = require("../models/restaurant-model");
const Repository = require("./repository");

class RestaurantRepository extends Repository{
  constructor() { 
    super(Restaurant); 
  }

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
}

module.exports = new RestaurantRepository();