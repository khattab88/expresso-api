/* eslint-disable prettier/prettier */
/* eslint-disable prefer-destructuring */
/* eslint-disable dot-notation */
/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });
const config = require("./config");

const app = require("./app");

const connectionString = config[(config["env"])].connectionString;
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(conn => { 
    // console.log(conn.connections); 
    console.log("DB Connection Successful.")
})
.catch(err => { 
    console.log(err);
    console.log("Unable to connect to DB.")
});


app.listen(process.env.PORT || 3000, () => {
    console.log("server started...")
});