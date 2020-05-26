const express = require("express");
const bodyParser = require("body-parser");

const cityRoutes = require("./routes/city");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.use(cityRoutes);

app.listen(8000);