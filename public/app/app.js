requirejs.config({
    baseUrl: 'app',
    paths: {
        jquery: 'lib/jquery',
        underscore: 'lib/underscore',
        backbone: 'lib/backbone'
    }
});

requirejs(['main']);