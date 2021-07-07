const express = require('express');
const UserRouter = require('./users/user-routes.js');

const server = express();

server.use(express.json());

server.use("/api/", UserRouter);

module.exports = server;