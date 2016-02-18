'use strict';
define([
    'jquery',
    'underscore',
    'backbone',
    'models/FilesModel',
    'views/FileSystemView'
], function ($, _, Backbone, FilesModel, FileSystemView) {
    let AppView = Backbone.View.extend({
        initialize: function() {
            this.render();
        },
        
        render: function() {
            let variables = { app_name: "PAM-3" };
            let template = _.template( $("#title_template").html() );
            this.$el.append(template(variables));
        }
    });
    
    new AppView({ 
        el: $("#app-name") 
    });
    
    new FilesModel().fetch();
});