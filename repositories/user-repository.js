/* eslint-disable prefer-destructuring */
/* eslint-disable one-var */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable prettier/prettier */
const User = require("../models/user-model");

class UserRepository {

    async getAll() {
        try {
            const users = await User.find();
            return users;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getById(id) {
        try {
            const user = await User.findOne({ id: id });
            return user;
        } catch (err) {
            throw new Error(err);
        }
    }

    async create(user) {
        try {
            const newUser = await User.create(user);
            return newUser;
        } catch (err) {
            throw new Error(err);
        }
    }

    async update(id, user) {
        try {
          const updated = await User.findOneAndUpdate({ id: id }, user, { 
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
          await User.findOneAndDelete({ id: id });
        }
        catch (err) {
          throw new Error(err);
        }
    }

    async getByEmail(email) {
        try {
            const user = await User.findOne({ email: email }).select("+password");
            return user;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getByFieldValue(fieldValue) {
        try {
            const user = await User.findOne(fieldValue);
            return user;
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = new UserRepository();