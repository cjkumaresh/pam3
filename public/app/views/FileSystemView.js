'use strict';
define([
    'jquery',
    'underscore',
    'backbone',
    'models/FilesModel'
],function ($, _, Backbone, FilesModel) {
    return  Backbone.View.extend({
        el: '#file-system-view',
        
        data: {
          path: '',
          files: ['Mo files']  
        },
        
        initialize: function (options) {
            if (options) {
                this.data = options;
            } 
            
            this.render();
        },
        
        render: function () {
            let fileSystemTemplate = _.template($("#file-system-view-template").html());
            this.$el.append(fileSystemTemplate(this.data));
        }
    });    
});