'use strict';

const fs = require('fs'),
    mime = require('mime-types'),
    pathUtil = require('path'),
    util = require('./filter');

module.exports = {

    getPath: function (req, path) {
        let accessPath = req.body.path.split('/');
        if (accessPath.length === 0) {
            return path;
        }
        for (var k in accessPath) {
            path = path + '\\' + accessPath[k];
        }
        console.log('Location :', path);
        return path;
    },

    sendFileList: function (req, res, path) {
        try {
            fs.accessSync(path, fs.F_OK);
            fs.readdir(path, function (err, files) {
                let filesArr = util.getProperFiles(path, files);
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ 'status': 'success', 'path': path, 'files': filesArr, 'type': 'files' }));
            });
        } catch (e) {
            throw e;
        }
    },

    streamFile: function (req, res, fsPath) {
        let file = fsPath + '/' + req.query.path.replace(/pam3/g, '/');
        res.download(file);
    },

    streamImageFile: function (req, res, fsPath) {
        let path = fsPath + '/' + req.query.path.replace(/pam3/g, '/');
        let img = fs.readFileSync(path);
        res.writeHead(200, { 'Content-Type': 'image/jpg' });
        res.end(img, 'binary');
    },

    streamMediaFile: function (req, res, fsPath, type) {
        let path = fsPath + '/' + req.query.path.replace(/pam3/g, '/'),
            range = req.headers.range,
            positions = range.replace(/bytes=/, "").split("-"),
            start = parseInt(positions[0], 10);

        try {
            fs.stat(path, function (err, stats) {
                let total = stats.size,
                    end = positions[1] ? parseInt(positions[1], 10) : total - 1,
                    chunksize = (end - start) + 1;

                res.writeHead(206, {
                    "Content-Range": "bytes " + start + "-" + end + "/" + total,
                    "Accept-Ranges": "bytes",
                    "Content-Length": chunksize,
                    "Content-Type": type
                });

                let stream = fs.createReadStream(path, { start: start, end: end })
                    .on("open", function () {
                        stream.pipe(res);
                    }).on("error", function (err) {
                        res.end(err);
                    });
            });
        } catch (err) {
            throw err;
        }
    }

}