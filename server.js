'use strict';
var config = require('./config.json'),
    express = require('express'),
    http = require('http'),
    fs = require('fs'),
    fileOps = require('./lib/utils/file-ops'),
    bodyParser = require('body-parser'),
    app = express(),
    open = require("open"),
    ip = require('ip');

var fsPath = config.homePath || process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];

exports.startServer = function () {
    app.use(express.static('public'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
        
    app.get('/getFiles', function (req, res) {
        fileOps.sendFileList(req, res, fsPath);
    });

    app.get('/audio*', function (req, res) {
        var type = "audio/mp3";
        fileOps.streamMediaFile(req, res, fsPath, type);
    });

    app.get('/video*', function (req, res) {
        var type = "video/mp4";
        fileOps.streamMediaFile(req, res, fsPath, type);
    });
    
    app.get('/image*', function (req, res) {
        fileOps.streamImageFile(req, res, fsPath);
    });
    
    app.get('/file*', function (req, res) {
        fileOps.streamFile(req, res, fsPath);
    });

    app.post('/navigate', function (req, res) {
        var path = fileOps.getPath(req, fsPath);
        fileOps.sendFileList(req, res, path);
    });
    
    app.get('/getHomes', function (req, res) {
       fileOps.sendConfiguredHomes(req, res); 
    });
    
    app.get('/setHome', function (req, res) {
        fsPath = req.query.home;
        res.end(fsPath);
    });

    app.listen(config.port, function () {
        var url = 'http://' + ip.address() + ':' + config.port;
        open(url);
        console.log('PAM is accessible @ ', url);
    });
};
