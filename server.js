'use strict';
const config = require('./config.json'),
    express = require('express'),
    http = require('http'),
    filter = require('./lib/utils/filter'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    fs = require('fs');
    
    
    
let server,
    app = express(),
    upload = multer();
    
const fsPath = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];

exports.startServer = function (http, fs) {    
    //initialize server
    app.use(express.static('public'));
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
        
    app.get('/getFiles', function (req, res) {
        sendFileList(req, res, fsPath);        
    });
    
     app.post('/navigate', function (req, res) {
        if (!req.body) 
            return res.sendStatus(400);
        let path = getPath(req),
            type = fs.lstatSync(path);
        (type.isDirectory()) ? sendFileList(req, res, path) : streamFile(req, res, path);   
    });

    app.listen(config.port, function () {
        console.log('Example app listening on port 3000!');
    });    
};

function sendFileList(req, res, path) {
    try {
        fs.accessSync(path, fs.F_OK);
        fs.readdir(path, function (err, files) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({'path':fsPath,'files':files}));
        });
    } catch (e) {
        throw e;
    }
}

function streamFile(req, res, path) {
    let file = fs.readFileSync(path);
    res.writeHead(200, {'Content-Type': 'image/jpg' });
    let base64data = new Buffer(file, 'binary').toString('base64');
    res.end(base64data);
}

function getPath(req) {
    let path = fsPath;
    let accessPath = req.body.path.split('/');
    for (var k in accessPath) {
        path = path + '\\' + accessPath[k];
    }
    return path;
}