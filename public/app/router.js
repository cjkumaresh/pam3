'use strict';
define([
    'jquery',
    'underscore',
    'backbone',
    'models/FilesModel',
    'views/AppView',
    'views/FileSystemView',
    'utils/navigation'
],function ($, _, Backbone, FilesModel, AppView, FileSystemView, Navigation, Audio) {    
    return  Backbone.Router.extend({
        routes: {          
            '': 'defaultRoute',
            'home': 'homeRoute',
            'home/*path': 'navigateRoute'       
        },
        
        defaultRoute: function () {
            new AppView({ 
                el: $("#app-name") 
            });
        },
        
        homeRoute: function () {
            new FilesModel().fetch().done(function(files) {
                new FileSystemView({
                    model: files
                });
            });
        },
        
        navigateRoute: function (path) {
            Navigation.handle(path);
        }
    }); 
});
