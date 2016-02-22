'use strict';
const config = require('./config.json'),
    Router = require('node-simple-router'),
    router = new Router(),    
    http = require('http'),
    filter = require('./lib/utils/filter');
    //serveStatic = require('serve-static')
    
    
let server;
const fsPath = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];

exports.startServer = function (http, fs) {    
    //initialize server    
    router.get('/getFiles', function (req, res) {
        try {
            fs.accessSync(fsPath, fs.F_OK);
            fs.readdir(fsPath, function (err, files) {
                res.setHeader('Content-Type', 'application/json');
                //files = files.filter(filter.getProperFiles);
                res.end(JSON.stringify({'path':fsPath,'files':files}));
            });
        } catch (e) {
            throw e;
        }
        
    });
    
     router.post('/navigate', function (req, res) {
        var path = fsPath;
        var accessPath = req.post.path.split('/');
        for (var k in accessPath) {
            path = path + '\\' + accessPath[k];
        }
        try {
            fs.accessSync(path, fs.F_OK);
            fs.readdir(path, function (err, files) {
                res.setHeader('Content-Type', 'application/json');
                //files = files.filter(filter.getProperFiles);
                res.end(JSON.stringify({'path':path,'files':files, 'params':req.post.path}));
            });
         } catch (e) {
            throw e;
        }
    });
    
    router.post('/openFile', function (req, res) {
        var path = fsPath +'\\' + decodeURIComponent(req.post.fileName);
        var readableStream = fs.createReadStream(path);
        readableStream.setEncoding('utf8');
        readableStream.pipe(res);
    });
    
    server = http.createServer(router);
    server.listen(config.port, function () {
       console.log('server is listening'); 
    });
};