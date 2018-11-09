const express = require('express');

const server = express();

const configureMiddleware = require('../config/middleware.js');

configureMiddleware(server)

server.get('/', (req, res) => {
    res.status(200).json({message: 'Up and running'})
})

module.exports = server;