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
    
     router.get('/navigate/:path', function (req, res) { 
        fsPath = fsPath +'\\' + decodeURIComponent(req.params.path);
        try {
            fs.accessSync(fsPath, fs.F_OK);
            fs.readdir(fsPath, function (err, files) {
                res.setHeader('Content-Type', 'application/json');
                //files = files.filter(filter.getProperFiles);
                res.end(JSON.stringify({'path':fsPath,'files':files, 'params':req.params.path}));
            });
         } catch (e) {
            throw e;
        }
    });
    
    router.post('/openFile', function (req, res) {
        fsPath = fsPath +'\\' + decodeURIComponent(req.post.fileName);
        var readableStream = fs.createReadStream(fsPath);
        //var writableStream = fs.createWriteStream('file2.txt');
        readableStream.setEncoding('utf8');
        readableStream.pipe(res);
    });
    
    server = http.createServer(router);
    server.listen(config.port, function () {
       console.log('server is listening'); 
    });
};