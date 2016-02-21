'use strict';
define([
    'jquery',
    'underscore',
    'backbone',
    'models/FilesModel',
    'views/FileSystemView'
], function ($, _, Backbone, FilesModel, FileSystemView) {
    
      var AppView = Backbone.View.extend({
            initialize: function () {
                this.render();
            },
            
            render: function () {
                let variables = { app_name: "PAM-3" };
                let template = _.template( $("#title_template").html() );
                this.$el.append(template(variables));
            }
      });
    
      var AppRouter = Backbone.Router.extend({
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
                new FilesModel().fetch({
                    url: 'navigate/' + path.replace('/','-')
                }).done(function(files) {
                    new FileSystemView({
                        model: files
                    });
                });
            }
      });

    var appRouter = new AppRouter();
    Backbone.history.start();

});