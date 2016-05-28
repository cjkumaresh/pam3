'use strict';

var fs = require('fs'),
    mime = require('mime-types'),
    pathUtil = require('path'),
    util = require('./filter'),
    config = require('../config');

module.exports = {

    getPath: function (req, path) {
        var accessPath = req.body.path.split('/');
        if (accessPath.length === 0) {
            return path;
        }
        for (var k=0; k < accessPath.length; k++) {
            path = path + '\\' + accessPath[k];
        }
        console.log('Location :', path);
        return path;
    },

    sendConfiguredHomes: function (req, res) {
        res.end(JSON.stringify({'frequentHomePaths': config.frequentHomePaths}));
    },

    sendFileList: function (req, res, path) {
        fs.accessSync(path, fs.F_OK);
        fs.readdir(path, function (err, files) {
            if (err) {
                console.log(err);
            }
            var filesArr = util.getProperFiles(path, files);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ 'path': path, 'files': filesArr }));
        });
    },

    streamFile: function (req, res, fsPath) {
        var file = fsPath + '/' + decodeURIComponent(req.query.path);
        res.download(file);
    },

    streamImageFile: function (req, res, fsPath) {
        var path = fsPath + '/' + decodeURIComponent(req.query.path);
        var img = fs.readFileSync(path);
        res.writeHead(200, { 'Content-Type': 'image/jpg' });
        res.end(img, 'binary');
    },

    streamMediaFile: function (req, res, fsPath, type) {
        var path = fsPath + '/' + decodeURIComponent(req.query.path),
            range = req.headers.range,
            positions = range.replace(/bytes=/, "").split("-"),
            start = parseInt(positions[0], 10);

        fs.stat(path, function (err, stats) {
            if (err) {
                console.log(err);
            }
            var total = stats.size,
                end = positions[1] ? parseInt(positions[1], 10) : total - 1,
                chunksize = (end - start) + 1;

            res.writeHead(206, {
                "Content-Range": "bytes " + start + "-" + end + "/" + total,
                "Accept-Ranges": "bytes",
                "Content-Length": chunksize,
                "Content-Type": type
            });

            var stream = fs.createReadStream(path, { start: start, end: end })
                .on("open", function () {
                    stream.pipe(res);
                }).on("error", function (err) {
                    res.end(err);
                });
        });
    }
}
