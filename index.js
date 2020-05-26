const express = require("express");
const bodyParser = require("body-parser");

const cityRoutes = require("./routes/city");

const app = express();

app.use(bodyParser.json());

app.use(cityRoutes);

app.listen(8000);