/* eslint-disable prettier/prettier */
const Menu = require('../models/menu-model');

class MenuRepository {

    async getStats() {
      return await Menu.aggregate([
        // { 
        //   $match: { specialOffers: { $eq: true } }
        // },
        { 
          $group: {
            _id: "$restaurant.rating", 
            num: { $sum: 1 },
            maxRating: { $max: "$restaurant.rating" }, 
            minRating: { $min: "$restaurant.rating" },
            avgRating: { $avg: "$restaurant.rating" }
          }
        },
        { 
          $sort: { maxRating: -1 } 
        }
      ]);  

  }

    async getCount() {
        return await Menu.countDocuments();
      }
    
      async getAll() {
        try {
          const menus = await Menu.find();
          return menus; 
        }
        catch(err) {
          throw new Error(err);
        }
      }
    
      async getById(id) {
        try {
          const menu = await Menu.findOne({ id: id });
          return menu;
        }
        catch(err) {
          throw new Error(err);
        }
      }
    
      async create(tag) {
        try {
          const newMenu = await Menu.create(tag);
          return newMenu;
        }
        catch (err) {
          throw new Error(err);
        }
      }
    
      async update(id, menu) {
        try {
          const updated = await Menu.findOneAndUpdate({ id: id }, menu, { 
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
          await Menu.findOneAndDelete({ id: id });
        }
        catch (err) {
          throw new Error(err);
        }
      }
      
    }

module.exports = new MenuRepository();    