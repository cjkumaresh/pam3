'use strict';
define([
    'jquery',
    'underscore',
    'backbone',
    'models/FilesModel',
    'views/FileSystemView'
], function ($, _, Backbone, FilesModel, FileSystemView) {
    //var files = new FilesModel().fetch();
    let AppView = Backbone.View.extend({
        initialize: function () {
            this.render();
        },
        
        render: function () {
            let variables = { app_name: "PAM-3" };
            let template = _.template( $("#title_template").html() );
            this.$el.append(template(variables));
        }
    });
    
    new AppView({ 
        el: $("#app-name") 
    });
    
    // new FileSystemView({
    //     model: files
    // });
    
    new FilesModel().fetch().done(function(files) {
        new FileSystemView({
            model: files
        });
    });
});