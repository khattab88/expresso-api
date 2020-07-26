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
        required: [true, 'City must have a name!'],
        trim: true,
        unique: true,
    },
    country: {
        // id: {
        //     type: String,
        //     default: uuidv4,
        //     unique: true,
        // },
        name: {
            type: String,
            required: [true, 'Country must have a name!'],
            unique: false,
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
                required: [true, 'Area must have a name!'],
                trim: true,
                unique: true,
            }
        }
    ]
});

const City = mongoose.model("city", citySchema);

module.exports = City;