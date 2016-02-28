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
    
    app.get('/music', function (req, res) {
        res.set({'Content-Type': 'audio/mpeg'});
        let readStream = fs.createReadStream('c:/users/intex/Downloads/Music/biriyani/07. Nahnh Na Nah (Jack Swing Mix) - www.TamilRockers.Net.mp3');
        readStream.pipe(res);     
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
            res.writeHead(200, mime.contentType(path));
            res.end(JSON.stringify({'status': 'success','src': base64data,'extn': fileExtn}));            
            break;
        case '.txt':
            res.setHeader('Content-Type', mime.contentType(path));
            res.end(JSON.stringify({'src': 'text file','extn': fileExtn}));
            break;
        case '.mp3':
            res.setHeader('Content-Type', mime.contentType(path));
            res.end(JSON.stringify({'src': 'audio file','extn': fileExtn}));
            break;
        case '.mp4':
            res.setHeader('Content-Type', mime.contentType(path));
            res.end(JSON.stringify({'src': 'implementation in progress','extn': fileExtn}));
            break;     
        default:
            res.setHeader('Content-Type', mime.contentType(path));
            res.end(JSON.stringify({'src': 'file format not supported yet','extn': fileExtn}));
            break; 
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