'use strict';
define([
    'jquery',
    'underscore',
    'backbone',
    'models/FilesModel'
],function ($, _, Backbone, FilesModel) {
    
    return  Backbone.View.extend({
        el: '#file-system-view',
        
        caller: '',
        
        events: {
            'click ul': 'handleSelect'
        },
        
        data: {
          path: '',
          files: ['No files']  
        },
        
        initialize: function (options) {
            if (options) {
                this.data['path'] = options.get('path');
                this.data['files'] = options.get('files');
                this.caller = options.get('caller');
            } 
            
            this.render();
        },
        
        render: function () {
            this.unbind();
            let fileSystemTemplate = _.template($("#file-system-view-template").html());
            this.$el.html(fileSystemTemplate(this.data));
        },
        
        handleSelect: function (e) {
            this.caller.fetch({
                url: 'navigate/' + e.target.textContent
            });
        }
    });    
});