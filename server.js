/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = require("./app");

app.listen(process.env.PORT || 3000, () => {
    console.log("server started...")
});