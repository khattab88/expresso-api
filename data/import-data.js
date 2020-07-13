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
      tag: Tag
  };

  // READ DATA FILE(S)
  const tags = JSON.parse(fs.readFileSync(`${__dirname}/tag-data.json`, "utf-8"));
  // console.log(tags);

  // IMPORT DATA TO DB
  const importData = async () => {
      try {
        await Tag.create(tags);
        console.log("data successfully loaded.");
      }
      catch (err) {
          console.log(err);
      }

      process.exit();
  };
  
  // DELETE EXSISTING DATA
  const deleteData = async () => {
    try {
        await Tag.deleteMany();
        console.log("data successfully deleted.");
      }
      catch (err) {
          console.log(err);
      }

      process.exit();
  };


if(process.argv[2] === "--import") {
    importData();
} else if(process.argv[2] === "--delete") {
    deleteData();
}


/* CMD node data/import-data.js --delete OR --import  */