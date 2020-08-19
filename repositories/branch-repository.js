/* eslint-disable prettier/prettier */
const Branch = require('../models/branch-model');

class BranchRepository {

    async getAll() {
        try {
            const branches = await Branch.find();
            return branches;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getById(id) {
        try {
            const branch = await Branch.findOne({ id: id });
            return branch;
        } catch (err) {
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

    async create(branch) {
        try {
          const newBranch = await Branch.create(branch);
          return newBranch;
        }
        catch (err) {
          throw new Error(err);
        }
    }

    async update(id, branch) {
        try {
          const updated = await Branch.findOneAndUpdate({ id: id }, branch, { 
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
          await Branch.findOneAndDelete({ id: id });
        }
        catch (err) {
          throw new Error(err);
        }
      }
}

module.exports = new BranchRepository();