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
            this.$el.find('#file-system-view').html('');  
            this.render();
        },
        
        render: function () {
            // Audio.getAudio(this.model);
            //this.$el.find('#file-system-view').html('');
             var url = '/audio?path=' + this.model.replace(/\//g, 'pam3'),
                 videoSrc = '<audio src ="' + url + '" type="audio/mp3" controls/>';
             this.$el.append(videoSrc);
        }
    });
});