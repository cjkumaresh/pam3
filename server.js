'use strict';
const config = require('./config.json'),
    express = require('express'),
    http = require('http'),
    filter = require('./lib/utils/filter'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    fs = require('fs'),
    mime = require('mime-types'),
    pathUtil = require('path');
    
    
    
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
    
    app.get('/audio*', function (req, res) {
        let type = "audio/mp3";
        streamMediaFile(req, res, type);     
    });
    
    app.get('/video*', function (req, res) {
        let type = "video/mp4";
        streamMediaFile(req, res, type);    
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
    let fileExtn = pathUtil.extname(path);
    
    switch (fileExtn) {
        case '.jpg':
            let base64data = new Buffer(file, 'binary').toString('base64');
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200, mime.contentType(path));
            res.end(JSON.stringify({'status': 'success','src': base64data,'extn': fileExtn}));            
            break;
        case '.txt',
             '.js',
             '.doc',
             '.xls':
            res.setHeader('Content-Type', mime.contentType(path));
            res.sendFile(path);
            break;
        default:
            res.setHeader('Content-Type', mime.contentType(path));
            res.end(JSON.stringify({'status': 'error','src': 'file format not supported yet','extn': fileExtn}));
            break; 
    }
}

function streamMediaFile (req, res, type) {
        let path = fsPath + '/' + req.query.path.replace(/pam3/g,'/');
        let range = req.headers.range;
        let positions = range.replace(/bytes=/, "").split("-");
        let start = parseInt(positions[0], 10);
        try {
            fs.stat(path, function(err, stats) {
                let total = stats.size;
                let end = positions[1] ? parseInt(positions[1], 10) : total - 1;
                let chunksize = (end - start) + 1;

                res.writeHead(206, {
                    "Content-Range": "bytes " + start + "-" + end + "/" + total,
                    "Accept-Ranges": "bytes",
                    "Content-Length": chunksize,
                    "Content-Type": type
                });

                let stream = fs.createReadStream(path, { start: start, end: end })
                .on("open", function() {
                    stream.pipe(res);
                }).on("error", function(err) {
                    res.end(err);
                });
            });
        } catch (err) {
            throw err;
        }
}

function getPath(req) {
    let path = fsPath;
    let accessPath = req.body.path.split('/');
    for (var k in accessPath) {
        path = path + '\\' + accessPath[k];
    }
    return path;
}