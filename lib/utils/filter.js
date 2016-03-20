'use strict';

const fs = require('fs'),
    pathUtil = require('path');

exports.getProperFiles = function(path, files) {
    let supportedFormat = ['txt', 'xls', 'xlsx', 'mp3', 'mp4', 'jpg', 'png', 'jpeg', 'mkv'],        
        isDir = false,
        fileExtn;
    
    return files.filter(function (file) {
        let filePath = path + '\\' + file;
        isDir = fs.lstatSync(filePath).isDirectory();
        fileExtn = pathUtil.extname(file.toLowerCase()).split('.')[1];
        
        return isDir ? true : (supportedFormat.indexOf(fileExtn) !== -1);
    });

}