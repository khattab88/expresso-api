/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable import/newline-after-import */
/* eslint-disable prettier/prettier */
/* eslint-disable function-paren-newline */
/* eslint-disable class-methods-use-this */
const fs = require("fs");
const path = require("path");
const mongodb = require("mongodb");

const Country = require("../core/entities/country");
const City = require("../core/entities/city");
const Area = require("../core/entities/area");

// eslint-disable-next-line prefer-destructuring
const MongoClient = mongodb.MongoClient;
const dbName = "expresso";
const dbUser = { userName: "expresso", password: "expresso_88" };
const url = `mongodb+srv://${dbUser.userName}:${dbUser.password}@cluster0-9lvdt.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const client = new MongoClient(url);


class CityRepository {
  
  getAll() {
    const cities = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../data/city-data.json"))
    );
    return cities;
  }

  get() {
    return [
      new City("1", "Cairo", new Country("1", "Egypt"), [
        new Area("1", "Heliopolis"),
        new Area("2", "Zamalek"),
        new Area("3", "DownTown"),
        new Area("4", "Nasr City"),
        new Area("5", "Maadi"),
        new Area("6", "Shoubra"),
      ]),

      new City("2", "Giza", new Country("1", "Egypt"), [
        new Area("7", "Mohandessien"),
        new Area("8", "Dokki"),
        new Area("9", "Giza Square"),
        new Area("10", "Haram"),
        new Area("11", "6th October"),
      ]),

      new City("3", "Alexandria", new Country("1", "Egypt"), [
        new Area("12", "San Stephano"),
        new Area("13", "DownTown"),
        new Area("14", "Sidi Beshr"),
        new Area("15", "El Raml"),
      ]),
    ];
  }

  add(city) {
    client.connect(function (err) {
      console.log("Connected successfully to server");

      const db = client.db(dbName);

      db.collection("cities").insertOne({ name: city.name }, (error, result) => {
        if (err) {
          console.log(error);
          
        }

        //console.log(result);
      });

      client.close();
    });
  }

  // getAll() {
  //     client.connect(function (err) {
  //         console.log("Connected successfully to server");

  //         const db = client.db(dbName);

  //         client.close();
  //     });
  // }
}

module.exports = new CityRepository();
