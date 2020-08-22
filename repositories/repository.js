/* eslint-disable prettier/prettier */
class Repository {
    constructor (model) {
        this.model = model;
    }
    
    async getAll (query) { 
        try {
            const docs = await this.model.find(query);
            return docs;
        } catch (err) {
            throw new Error(err);
        }
    }
    
    async getById (id) { 
        try {
            const doc = await this.model.findOne({ id: id });
            return doc;
        } catch (err) {
            throw new Error(err);
        }
     }

    async create (doc) { 
        try {
            const newDoc = await this.model.create(doc);
            return newDoc;
          }
          catch (err) {
            throw new Error(err);
          }
     }

    async update (id, doc) { 
        try {
            const updated = await this.model.findOneAndUpdate({ id: id }, doc, { 
              new: true,
              runValidators: true
            });
            return updated;
          }
          catch (err) {
            throw new Error(err);
          }
     }

    async delete (id) { 
        try {
            await this.modelfindOneAndDelete({ id: id });
          }
          catch (err) {
            throw new Error(err);
          }
     }
}

module.exports = Repository;