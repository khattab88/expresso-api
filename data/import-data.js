/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable prefer-destructuring */
/* eslint-disable prettier/prettier */
/* eslint-disable dot-notation */
/* eslint-disable no-unused-vars */
const fs = require('fs');
const mongoose = require('mongoose');
const config = require("../config");

const Tag = require("../models/tag-model");
const Menu = require("../models/menu-model");

// CONNECT TO DATABASE
const connectionString = config[config['env']].connectionString;
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((conn) => { console.log('DB Connection Successful.'); })
  .catch((err) => { console.log(err); });


  const mapping = {
      tag: Tag,
      menu: Menu
  };

  // READ DATA FILE
  const readData = (type) => {
    return JSON.parse(fs.readFileSync(`${__dirname}/${type}-data.json`, "utf-8"));
  };

  // DELETE EXSISTING DATA
  const deleteData = async (type) => {
      try {
          await mapping[type].deleteMany();
          console.log("data successfully deleted.");
        }
        catch (err) {
            console.log(err);
        }
  
        process.exit();
   };

  // IMPORT DATA TO DB
  const importData = async (type) => {
      try {
        const data = readData(type);

        await mapping[type].create(data);
        console.log("data successfully loaded.");
      }
      catch (err) {
          console.log(err);
      }

      process.exit();
   };


const type = process.argv[3];
if(process.argv[2] === "--import") {
    importData(type);
} else if(process.argv[2] === "--delete") {
    deleteData(type);
}


/* CMD node data/import-data.js --delete || --import [TYPE]  */