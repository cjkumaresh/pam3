'use strict';
define([
    'jquery',
    'underscore',
    'backbone',
    'models/FilesModel'
],function ($, _, Backbone, FilesModel) {
    var files;
    return  Backbone.View.extend({
        el: '#file-system-view',
        
        files: '',
        
        initialize: function (options) {
            files = options ? {'files': options.files }: ['No files'];
            this.render();
        },
        
        render: function () {
            let fileSystemTemplate = _.template($("#file-system-view-template").html());
            this.$el.append(fileSystemTemplate(files));
        }
    });    
});