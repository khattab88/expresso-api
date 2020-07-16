/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const citySchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true,
      },
    name: {
        type: String,
        required: [true, 'Tag must have a name!'],
        trim: true,
        unique: true,
    },
    country: {
        id: {
            type: String,
            default: uuidv4,
            unique: true,
          },
        name: {
            type: String,
            required: [true, 'Tag must have a name!'],
            trim: true,
            unique: true,
        },
    },
    areas: [
        {
            id: {
                type: String,
                default: uuidv4,
                unique: true,
              },
            name: {
                type: String,
                required: [true, 'Tag must have a name!'],
                trim: true,
                unique: true,
            }
        }
    ]
});

const City = mongoose.model("city", citySchema);

module.exports = City;