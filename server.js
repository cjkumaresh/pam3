'use strict';
const config = require('./config.json'),
    Router = require('node-simple-router'),
    router = new Router(),
    fsPath = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'],
    finalHandler = require('finalhandler'),
    http = require('http'),
    serveStatic = require('serve-static'),
    serve = serveStatic('public', {'index': false});
    
let server;

exports.startServer = function (http, fs) {    
    //initialize router 
    router.get("/remote", function (req, res) {
        res.end("remote");
    });
    
    router.get("/getFiles", function (req, res) {
        fs.readdir(fsPath,function (err, files) {
            res.write(fsPath);
            for (let key in files) {
                res.write('\n');
                res.write(files[key]);
            }
            res.end();
        });
    });
    
    //initialize server
    server = http.createServer(router);
    server.listen(config.port,function () {
       console.log('server is listening'); 
    });
};