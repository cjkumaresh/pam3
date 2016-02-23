'use strict';
define([
    'jquery',
    'underscore',
    'backbone',
    'models/FilesModel'
],function ($, _, Backbone, FilesModel) {    
    return Backbone.View.extend({
        el: '#file-system-view',

        initialize: function () {
            this.model.location = location.href.split('#')[1] + "/";    
            this.render();
        },
        
        render: function () {
            $('#media-view').html('');
            let fileSystemTemplate = _.template($("#file-system-view-template").html());
            this.$el.html(fileSystemTemplate(this.model));
            return this;
        }
        
    });    
});