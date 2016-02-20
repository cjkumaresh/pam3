'use strict';
define([
    'jquery',
    'underscore',
    'backbone',
    'models/FilesModel'
],function ($, _, Backbone, FilesModel) {
    
    return  Backbone.View.extend({
        el: '#file-system-view',
        
        events: {
            'click ul': 'handleSelect'
        },
        
        data: {
          path: '',
          files: ['Mo files']  
        },
        
        initialize: function () {
            if (this.model) {
                this.data = this.model;
            } 
            
            this.render();
        },
        
        render: function () {
            let fileSystemTemplate = _.template($("#file-system-view-template").html());
            this.$el.append(fileSystemTemplate(this.data));
        },
        
        handleSelect: function (e) {
           console.log(e.target.textContent);
        }
    });    
});