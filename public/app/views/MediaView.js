'use strict';
define([
    'jquery',
    'underscore',
    'backbone'
],function($, _, Backbone){
    return Backbone.View.extend({
        el: '#media-view',
        
        initialize: function () {
            this.model.type = 'picture';    
            this.render();
        },
        
        render: function () {
            $('#file-system-view').html('');
            var mediaFileViewTemplate = _.template($('#media-file-view-template').html());
            this.$el.append(mediaFileViewTemplate(this.model));
        }
    });
});