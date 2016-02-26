'use strict';
const config = require('./config.json'),
    express = require('express'),
    http = require('http'),
    filter = require('./lib/utils/filter'),
    bodyParser = require('body-parser'),
    multer = require('multer');
    
    
    
let server,
    app = express(),
    upload = multer();
    
const fsPath = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];

exports.startServer = function (http, fs) {    
    //initialize server
    app.use(express.static('public'));
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    // app.get('/', function (req, res) {
    //     sendFileList(req, res, fs);        
    // });
        
    app.get('/getFiles', function (req, res) {
        sendFileList(req, res, fs);        
    });
    
     app.post('/navigate', function (req, res) {
        if (!req.body) 
            return res.sendStatus(400);
        var path = fsPath;
        var accessPath = req.body.path.split('/');
        for (var k in accessPath) {
            path = path + '\\' + accessPath[k];
        }
        try {
            var type = fs.lstatSync(path);
            if (type.isDirectory()) {
                fs.readdir(path, function (err, files) {
                    res.setHeader('Content-Type', 'application/json');
                    //files = files.filter(filter.getProperFiles);
                    res.end(JSON.stringify({'path':path,'files':files, 'params':req.body}));
                });    
            } else {
                // var readableStream = fs.createReadStream(path);
                // readableStream.setEncoding('utf8');
                // readableStream.pipe(res);
                // var file = fs.readFileSync(path);
                 res.writeHead(200, {'Content-Type': 'image/jpg' });
                // res.end(bin2string(file));
                res.sendFile(path);
            }
            
         } catch (e) {
            throw e;
        }
    });

    app.listen(3000, function () {
        console.log('Example app listening on port 3000!');
    });    
};

function sendFileList(req, res, fs) {
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
}