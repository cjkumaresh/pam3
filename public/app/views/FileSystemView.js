'use strict';
define([
    'jquery',
    'underscore',
    'backbone',
    'models/FilesModel'
],function ($, _, Backbone, FilesModel) {    
    return Backbone.View.extend({
        el: '#file-system-view',
        
        events: {
           // 'click .list-group-item': 'onClickFile',    
        },
        

        initialize: function () {
            this.model.location = location.href.split('#')[1] + "/";    
            this.render();
        },
        
        render: function () {
            $('#media-view').html('');
            var fileSystemTemplate = _.template($("#file-system-view-template").html());
            this.$el.html(fileSystemTemplate(this.model));
            return this;
        },
               
        onClickFile: function (event) {
            location.href = $(event.target).find('a').attr('href');
        }
        
    });    
});