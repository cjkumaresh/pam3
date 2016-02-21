'use strict';
define([
    'jquery',
    'underscore',
    'backbone',
    'models/FilesModel'
],function ($, _, Backbone, FilesModel) {
    var filesModel = new FilesModel();
    return Backbone.View.extend({
        el: '#file-system-view',
        
        caller: '',
        
        // events: {
        //     'click ul': 'handleSelect'
        // },
        
        initialize: function () {
            this.model.location = location.href.split('#')[1] + "/";    
            this.render();
            //this.model.bind('change', this.render);
        },
        
        render: function () {
            let fileSystemTemplate = _.template($("#file-system-view-template").html());
            this.$el.html(fileSystemTemplate(this.model));
            return this;
        },
        
        handleSelect: function (e) {
            var accessPath = e.target.textContent;
            var keys = ['txt', 'xls', 'xlsx', 'mp3', 'mp4', 'jpg', 'png' ];
            if (keys.indexOf(accessPath.split('.')[1]) !== -1) {
                location.href = location.href + '/' + accessPath;
                $.ajax({
                   url: 'openFile',
                   data: {'fileName': accessPath},
                   type: 'POST',
                   success: function (data) {
                       console.log('data');
                   }
                });
            } else {
                location.href = location.href + '/navigate/' + accessPath;
            }
          
        }
    });    
});