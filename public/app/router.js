'use strict';
define([
    'jquery',
    'underscore',
    'backbone',
    'models/FilesModel',
    'views/AppView',
    'views/FileSystemView',
    'views/MediaView'
],function ($, _, Backbone, FilesModel, AppView, FileSystemView, MediaView) {    
    return  Backbone.Router.extend({
        routes: {          
            '': 'defaultRoute',
            'home': 'homeRoute',
            'home/*path': 'navigateRoute',          
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
            $.ajax({
                url: 'navigate',
                type: 'POST',
                data:{'path': path}
            }).done(function(data) {
                if (data.files) {
                    new FileSystemView({
                        model: data
                    });    
                } else {
                    new MediaView({
                        model: {'src': "data:image/jpg;base64," + data}
                    })
                }
            });
        }
    }); 
});