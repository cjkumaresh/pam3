'use strict';
const config = require('./config.json'),
    Router = require('node-simple-router'),
    router = new Router(),
    fsPath = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'],
    http = require('http'),
    serveStatic = require('serve-static'),
    serve = serveStatic('public', {'index': 'index.html'});
    
let server;

exports.startServer = function (http, fs) {    
    //initialize server
    server = http.createServer(router);
    server.listen(config.port,function () {
       console.log('server is listening'); 
    });
};