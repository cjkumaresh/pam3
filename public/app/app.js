requirejs.config({
    baseUrl: 'app',
    paths: {
        jquery: 'lib/jquery',
        underscore: 'lib/underscore',
        backbone: 'lib/backbone',
        bootstrap: 'lib/bootstrap.min',
        jquerySwipe: 'lib/jquery.touchSwipe.min'
    },
    shim: {
        jquerySwipe: {
            deps: ['jquery']
        },
        bootstrap: {
            deps: ['jquery']
        }
    }
});

requirejs(['main']);
