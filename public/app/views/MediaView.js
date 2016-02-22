'use strict';
define([
    'jquery',
    'underscore',
    'backbone'
],function($, _, Backbone){
    return Backbone.View.extend({
        el: 'body',
        
        initialize: function () {
            this.model.fileName = this.getFileName(location.href);
            this.model.type = 'text';  
            this.model.src = this.model.src;    
            this.render();
        },
        
        render: function () {
            let mediaFileViewTemplate = _.template($("#media-file-view-template").html());
            this.$el.html(mediaFileViewTemplate(this.model));
        },
        
        getFileName: function (url) {
            var parseUrl = url.split('/');
            var fileName = parseUrl[parseUrl.length-1];
            return fileName;
        }
    });
});