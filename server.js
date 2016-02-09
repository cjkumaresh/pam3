'use strict';
const config = require('./config.json'),
    Router = require('node-simple-router'),
    router = new Router(),
    fsPath = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'],
    http = require('http'),
    serveStatic = require('serve-static'),
    //serve = serveStatic('public', {'index': 'index.html'}),
    serve2 = serveStatic('node_modules', {});
    
let server;

exports.startServer = function (http, fs) {    
    //initialize server
    
    router.get("/getFiles", function (req, res) {
        fs.readdir(fsPath,function (err, files) {
            res.setHeader('Content-Type', 'application/json');
            res.end( JSON.stringify(files) );
        });
    });
    
    server = http.createServer(router);
    server.listen(config.port,function () {
       console.log('server is listening'); 
    });
};