const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/index.js");
const cors = require("cors");
require("./db.js");


const server = express();
server.use(express.json());

server.name = "API";

server.use(cors())

server.use("/", routes);

module.exports = server;