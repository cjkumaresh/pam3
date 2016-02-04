exports.startServer = function (http, fs) {
    var config = require('./config.json'),
        Router = require('node-simple-router'),
        router = new Router(),
        fsPath = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
    
    
    //initialize router 
    router.get("/remote", function (request, response) {
        response.end("remote");
    });
    
    router.get("/", function (request, response) {
        fs.readdir(fsPath,function (err, files) {
            response.write(fsPath);
            for (var key in files) {
                response.write('\n');
                response.write(files[key]);
            }
            response.end();
        });

    });
    
    //initialize server
    var server = http.createServer(router);
    server.listen(config.port,function () {
       console.log('server is listening'); 
    });
};