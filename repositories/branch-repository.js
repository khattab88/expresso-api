/* eslint-disable prettier/prettier */
const Branch = require('../models/branch-model');
const Restaurant = require('../models/restaurant-model');
const Repository = require("./repository");

class BranchRepository extends Repository{
  constructor() { 
    super(Branch); 
  }

  async getByRestaurantId(restaurantId) {
    try {
      // const branches = await Branch.find({ "restaurant.id": restaurantId });
      const restaurant = await Restaurant.findOne({ id: restaurantId });
      const restaurantBranches = await Branch.find({ restaurant: restaurant._id });
      return restaurantBranches;
    }
    catch(err) {
      throw new Error(err);
    }
  }
  
  async getByIdWith(id, field) {
    try {
      const branch = await Branch.findOne({ id }).populate({
        path: field,
        select: "-__v"
      });
      return branch;
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = new BranchRepository();