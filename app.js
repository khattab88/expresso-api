/* eslint-disable prettier/prettier */
const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xssClean = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const { graphqlHTTP } = require("express-graphql");
const graphqlSchema = require("./graphql/schema");
const graphqlResolver = require("./graphql/resolver");

const AppError = require("./utils/app-error");
const globalErorrHandler = require("./controllers/error-controller");

const viewRouter = require('./routes/view-routes')
const cityRouter = require("./routes/city-routes");
const restaurantRouter = require("./routes/restaurant-routes");
const userRouter = require("./routes/user-routes");
const authRouter = require("./routes/auth-routes");
const branchRouter = require("./routes/branch-routes");
const areaRouter = require("./routes/area-routes");
const countryRouter = require("./routes/country-routes");
const orderRouter = require("./routes/order-routes");
const menuRouter = require("./routes/menu-routes");
const menuSectionRouter = require("./routes/menuSection-routes");
const menuItemRouter = require("./routes/menuItem-routes");
const orderItemRouter = require("./routes/orderItem-routes");
const tagRouter = require("./routes/tag-routes");
const categoryRouter = require("./routes/category-routes");
const menuItemOptionRouter = require("./routes/menuItemOption-routes");
const menuItemOptionItemRouter = require("./routes/menuItemOptionItem-routes");
const addressRouter = require("./routes/address-routes");

const app = express();

app.enable("trust proxy");

console.log("NODE_ENV: " + process.env.NODE_ENV);
console.log("APP_ENV: " + process.env.APP_ENV);


/* GLOBAL MIDDLEWARES */

// setting view engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Serving static files
app.use(express.static(`${__dirname}/public`));

// Setting security HTTP headers
app.use(
    helmet({
        contentSecurityPolicy: false // VERY BAD: disabling content security policy
}));

app.use(bodyParser.json({ limit: "500kb" })); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS attacks
app.use(xssClean());

// prevent http parameter pollution
app.use(hpp());

// Development Logging
if(process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Limiting requests from same IP address
const limiter = rateLimit({
    max: 1000,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP, please try again in a hour!"
});
app.use("/api/", limiter);

// // Enabling CORS
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//     // console.log(req.headers);

//     next();
// });

app.use(cors());
app.options('*', cors());

// Allow loading external images 
// https://stackoverflow.com/questions/21048252/nodejs-where-exactly-can-i-put-the-content-security-policy
app.use((req, res, next) => {
    //res.setHeader("Content-Security-Policy", "img-src 'self' https://cdnjs.cloudflare.com");
    //res.setHeader("Content-Security-Policy", "worker-src 'self' https://api.mapbox.com");
    //res.setHeader("Content-Security-Policy", "img-src 'self' https://api.mapbox.com");
    //res.set("Content-Security-Policy", "default-src 'self'");

    next();
});

// enable response compression
app.use(compression());

// GraphQl
app.use("/graphql", graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver
}));

// Test Middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    // console.log("cookies:", req.cookies);

    next();
}); 


/* ROUTERS */
app.use("/views", viewRouter);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/addresses", addressRouter);
app.use("/api/v1/countries", countryRouter);
app.use("/api/v1/cities", cityRouter);
app.use("/api/v1/areas", areaRouter);
app.use("/api/v1/restaurants", restaurantRouter);
app.use("/api/v1/branches", branchRouter);
app.use("/api/v1/menus", menuRouter);
app.use("/api/v1/menusections", menuSectionRouter);
app.use("/api/v1/menuitems", menuItemRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/orderitems", orderItemRouter);
app.use("/api/v1/tags", tagRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/menuitemoptions", menuItemOptionRouter);
app.use("/api/v1/menuitemoptionitems", menuItemOptionItemRouter);

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