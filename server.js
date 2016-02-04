exports.startServer = function (http, fs) {
    var Router = require('node-simple-router');
    var router = new Router();
    
    router.get("/remote", function (request, response) {
        response.end("remote");
    });
    
    router.get("/", function (request, response) {
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
    
    var server = http.createServer(router);
    server.listen(8881,function () {
       console.log('server is listening'); 
    });
};