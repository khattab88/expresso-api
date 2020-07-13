const config = require("./config");

console.log(config[(config["env"])].connectionString);