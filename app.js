/* eslint-disable prettier/prettier */
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const AppError = require("./utils/app-error");
const globalErorrHandler = require("./controllers/error-controller");

const cityRouter = require("./routes/city-routes");
const restaurantRouter = require("./routes/restaurant-routes");
const tagRouter = require("./routes/tag-routes");
const menuRouter = require("./routes/menu-routes");
const userRouter = require("./routes/user-routes");
const authRouter = require("./routes/auth-routes");

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
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);

/* ROOT ROUTE */
app.get("/", (req, res) => {
    res.send("Expresso API");
});

/* FALLBACK ROUTE */
app.all("*", (req, res, next) => {
    const err = new AppError(`Can't find ${req.originalUrl} on this server!`, 404);
    
    next(err);
});

/* GLOBAL ERROR HANDLING MIDDLEWARE */
app.use(globalErorrHandler);


module.exports = app;