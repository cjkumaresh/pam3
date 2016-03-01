'use strict';
define([
    'jquery',
    'underscore',
    'backbone',
    'utils/audio'
],function($, _, Backbone, Audio){
    return Backbone.View.extend({
        el: 'body',
        
        initialize: function () {  
            this.render();
        },
        
        render: function () {
            Audio.getAudio(this.model);
            this.$el.find('#file-system-view').html('');
        }
    });
});