/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const tagSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,
    // default: () => uuidv4(),
    unique: true,
  },
  name: {
    type: String,
    required: [true, 'Tag must have a name!'],
    trim: true,
    unique: true,
  }
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;

// const testTag = new Tag({ name: "test tag" });
// testTag.save()
//         .then(doc => console.log(doc))
//         .catch(err => console.log(err));
