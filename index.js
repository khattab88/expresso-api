const express = require("express");
const bodyParser = require("body-parser");

// const cityRoutes = require("./routes/city");

const app = express();

app.use(bodyParser.json());

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//     next();
// });

// app.use(cityRoutes);

app.get("/", (req, res) => {
    res.send("hello expresso!");
});

// app.listen(8000);

// app.listen(process.env.PORT, process.env.HOST, () => {
//     console.log("server started on " + process.env.HOST + ":" + process.env.PORT);
// });

app.listen(process.env.PORT || 3000);