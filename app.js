'use strict';

const server = require('./server.js'),
    http = require('http'),
    fs = require('fs');

server.startServer(http, fs);
