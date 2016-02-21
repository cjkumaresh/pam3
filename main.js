'use strict';

const electron = require('electron'),
    app = electron.app,
    BrowserWindow = electron.BrowserWindow,
    server = require('./server.js'),
    http = require('http'),
    fs = require('fs'),
    ip = require('ip'),
    ipc = require('ipc'),
    config = require('./config.json');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
    mainWindow = new BrowserWindow({width: 800, height: 600});
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    mainWindow.webContents.openDevTools();
    mainWindow.on('closed', function() {
        mainWindow = null;
    });
}

//start the server
server.startServer(http, fs);

ipc.on('getIp', function(event, data) {
    event.sender.send('local-ip', ip.address() + ':' + config.port);         
});


app.on('ready', createWindow);
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();    
    }
});
