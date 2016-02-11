'use strict';
const config = require('./config.json'),
    Router = require('node-simple-router'),
    router = new Router(),    
    http = require('http'),
    filter = require('./lib/utils/filter');
    //serveStatic = require('serve-static')
    
    
let server,
    fsPath = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];

exports.startServer = function (http, fs) {    
    //initialize server
    
    router.get("/getFiles", function (req, res) {
        fs.readdir(fsPath,function (err, files) {
            res.setHeader('Content-Type', 'application/json');
            files = files.filter(filter.getProperFiles);
            res.end( JSON.stringify(files) );
        });
    });
    
    server = http.createServer(router);
    server.listen(config.port,function () {
       console.log('server is listening'); 
    });
};