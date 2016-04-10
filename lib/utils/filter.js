'use strict';

var fs = require('fs'),
    pathUtil = require('path');

exports.getProperFiles = function (path, files) {
    var supportedFormat = ['js', 'doc', 'docx', 'txt', 'xls', 'xlsx', 'mp3', 'mp4', 'jpg', 'png', 'jpeg', 'mkv'],
        isDir = false,
        fileExtn;

    return files.filter(function (file) {
        var filePath = path + '\\' + file;
        isDir = fs.lstatSync(filePath).isDirectory();
        fileExtn = pathUtil.extname(file.toLowerCase()).split('.')[1];

        return isDir ? true : (supportedFormat.indexOf(fileExtn) !== -1);
    });

}