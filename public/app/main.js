'use strict';
define([
    'jquery',
    'underscore',
    'backbone',
    'models/FilesModel',
    'views/FileSystemView',
    'views/MediaView'
], function ($, _, Backbone, FilesModel, FileSystemView, MediaView) {
    
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
                            model: {'src': data}
                        })
                    }
                });
            }
      });

    var appRouter = new AppRouter();
    Backbone.history.start();

});