'use strict';
const config = require('./config.json'),
    express = require('express'),
    http = require('http'),
    fileOps = require('./lib/utils/file-ops'),
    bodyParser = require('body-parser'),
    app = express();    
    
const fsPath = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];

exports.startServer = function (http, fs) {    
    //initialize server
    app.use(express.static('public'));
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
        
    app.get('/getFiles', function (req, res) {
        fileOps.sendFileList(req, res, fsPath);        
    });
    
    app.get('/audio*', function (req, res) {
        let type = "audio/mp3";
        fileOps.streamMediaFile(req, res, fsPath, type);     
    });
    
    app.get('/video*', function (req, res) {
        let type = "video/mp4";
        fileOps.streamMediaFile(req, res, fsPath, type);    
    });
    
    app.post('/navigate', function (req, res) {
        if (!req.body) 
            return res.sendStatus(400);
        let path = fileOps.getPath(req, fsPath),
            type = fs.lstatSync(path);
        (type.isDirectory()) ? fileOps.sendFileList(req, res, path) : fileOps.streamFile(req, res, path);   
    });

    app.listen(config.port, function () {
        console.log('PAM is listening on port', config.port);
    });    
};
