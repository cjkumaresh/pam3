exports.startServer = function (http, fs) {
    var server = http.createServer(function (request, response) {
        var fsPath = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
        fs.readdir(fsPath,function (err, files) {
            response.write(fsPath);
            for (var key in files) {
                response.write('\n');
                response.write(files[key]);
            }
            response.end();
        });

    });
    server.listen(8881,function () {
       console.log('server is listening'); 
    });
};