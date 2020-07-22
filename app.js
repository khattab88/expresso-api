/* eslint-disable prettier/prettier */
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const cityRouter = require("./routes/city-routes");
const restaurantRouter = require("./routes/restaurant-routes");
const tagRouter = require("./routes/tag-routes");
const menuRouter = require("./routes/menu-routes");

const app = express();


/* MIDDLEWARES */
console.log(process.env.NODE_ENV);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static(`${__dirname}/public`));

if(process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});


/* ROUTERS */
app.use("/api/v1/cities", cityRouter);
app.use("/api/v1/restaurants", restaurantRouter);
app.use("/api/v1/tags", tagRouter);
app.use("/api/v1/menus", menuRouter);


/* ROOT ROUTE */
app.get("/", (req, res) => {
    res.send("Expresso API");
});


module.exports = app;