const express = require("express");
const server = express();
server.use(express.json());
const errorHandler = require('./errors/error-handler');
const usersController = require("./controllers/users-controller");
const vacationsControllers = require("./controllers/vacations-controller");
const followsControllers = require("./controllers/follows-controller");

const cors = require("cors");
server.use(cors({ origin: "http://localhost:3000" }));

server.use("/users", usersController);
server.use("/vacations", vacationsControllers);
server.use("/follows", followsControllers);
server.use(errorHandler);
server.listen(3001, () => console.log("Listening on http://localhost:3001"));












