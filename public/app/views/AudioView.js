'use strict';
define([
    'jquery',
    'underscore',
    'backbone',
    'utils/audio'
],function($, _, Backbone, Audio){
    return Backbone.View.extend({
        el: '#view',
        
        initialize: function () {
            this.$el.find('#file-system-view').html('');  
            this.render();
        },
        
        render: function () {
             var url = '/audio?path=' + this.model.replace(/\//g, 'pam3'),
                 $audio = '<audio class="col-xs-12" src ="' + url + '" type="audio/mp3" controls/>';
             this.$el.html($audio);
        }
    });
});