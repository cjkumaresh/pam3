'use strict';
define([
    'jquery',
    'underscore',
    'backbone',
    'app/models/FilesModel.js'
], function ($, _, Backbone, FilesModel) {
    let filesModel = new FilesModel(),
        AppView = Backbone.View.extend({
        initialize: function() {
            filesModel.fetch();
            this.render();
        },
        render: function() {
            let variables = { app_name: "PAM-3" };
            let template = _.template( $("#title_template").html() );
            this.$el.html( template(variables) );
        }
    }),
    app_view = new AppView({ 
        el: $("body"),
        model: filesModel 
    });
});