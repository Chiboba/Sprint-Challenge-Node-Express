const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const projectRouter = require('../projectModel/projectModelRouter.js');
const actionRouter = require('../actionModel/actionModelRouter.js');

module.exports = (server) => {
    server.use(express.json());
    server.use(helmet());
    server.use(morgan('short'));
    server.use('/api/project', projectRouter);
    server.use('/api/action', actionRouter);
}