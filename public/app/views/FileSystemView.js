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
        
        events: {
            'click ul': 'handleSelect'
        },
        
        initialize: function () {
            //this.model = filesModel.fetch();    
            this.render();
            //this.model.bind('change', this.render);
        },
        
        render: function () {
            let fileSystemTemplate = _.template($("#file-system-view-template").html());
            this.$el.html(fileSystemTemplate(this.model));
            return this;
        },
        
        handleSelect: function (e) {
            var view = this;
            var accessPath = e.target.textContent;
            var keys = ['txt', 'xls', 'xlsx', 'mp3', 'mp4', 'jpg', 'png' ];
            if (keys.indexOf(accessPath.split('.')[1]) !== -1) {
                //  filesModel.save({
                //     url: 'openFile',
                //     data: {'fileName': accessPath}
                //  }).done(function(data) {
                //     view.model = data;
                //     view.render();
                // });
                $.ajax({
                   url: 'openFile',
                   data: {'fileName': accessPath},
                   type: 'POST',
                   success: function (data) {
                       console.log('data');
                   }
                });
            } else {
                filesModel.fetch({
                    url: 'navigate/' + encodeURIComponent(accessPath)
                }).done(function(data) {
                    view.model = data;
                    view.render();
                });
            }
          
        }
    });    
});