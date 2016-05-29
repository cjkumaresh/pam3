requirejs.config({
    baseUrl: 'app',
    paths: {
        jquery: 'lib/jquery',
        underscore: 'lib/underscore',
        backbone: 'lib/backbone',
        jquerySwipe: 'lib/jquery.touchSwipe.min'
    },
    shim: {
        jquerySwipe: {
            deps: ['jquery']
        }
    }
});

requirejs(['main']);
