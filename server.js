/* eslint-disable prettier/prettier */
/* eslint-disable prefer-destructuring */
/* eslint-disable dot-notation */
/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
const dotenv = require("dotenv");
const mongoose = require("mongoose");


/* handle UNCAUGHT EXCEPTION for sync code */
process.on("uncaughtException", err => {
    console.log("UNCAUGHT EXCEPTION!");
    console.error(err);
    
    // shutdown app immediately
    process.exit(1);
});


dotenv.config({ path: `./.env.${process.env.APP_ENV}` });
const config = require("./config");

const app = require("./app");


const connectionString = config.dbConnection;
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
    console.error(err);
    console.log("Unable to connect to DB.");

    process.exit(1);
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log("server started on port " + port)
});


/* handle UNHANDLED REJECTION for async code */
process.on('unhandledRejection', err => {
    console.log("UNHANDLED REJECTION!");
    console.error(err);
    
    // shutdown app gracefully
    server.close(() => {
        process.exit(1);
    });
});

/* handle SIGTERM */
process.on("SIGTERM", err => {
    console.log("SIGTERM received, shutting down gracefully!");

    server.close(() => {
        console.log("Process Terminated!")
    });
});