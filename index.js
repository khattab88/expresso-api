const express = require("express");
const bodyParser = require("body-parser");

const cityRoutes = require("./routes/city-routes");
const tagRoutes = require("./routes/tag-routes");

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.use(cityRoutes);
app.use(tagRoutes);


app.get("/", (req, res) => {
    res.send("hello expresso!");
});

app.listen(process.env.PORT || 3000);