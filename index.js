const express = require("express");
const bodyParser = require("body-parser");

const cityRoutes = require("./routes/city");
const tagRoutes = require("./routes/tag");

const app = express();

app.use(bodyParser.json());

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