'use strict';
define([
    'jquery',
    'underscore',
    'backbone'
],function($, _, Backbone){
    return Backbone.View.extend({
        el: '#media-view',
        
        initialize: function () {
            this.model.fileName = this.getFileName(location.href);
            this.model.type = 'picture';  
            this.model.src = this.model.src;    
            this.render();
        },
        
        render: function () {
            $('#file-system-view').html('');
            let mediaFileViewTemplate = _.template($("#media-file-view-template").html());
            this.$el.append(mediaFileViewTemplate(this.model));
        },
        
        getFileName: function (url) {
            var parseUrl = url.split('/');
            var fileName = parseUrl[parseUrl.length-1];
            return fileName;
        }
    });
});