'use strict';
define([
    'backbone',
    'utils/audio'
],function(Backbone, Audio){
    return Backbone.View.extend({
        el: '#view',
        
        initialize: function () {
            this.$el.find('#file-system-view').html('');  
            this.render();
        },
        
        render: function () {
             var url = '/audio?path=' + this.model.replace(/\//g, 'pam3'),
                 $audio = '<audio class="col-xs-12 media" src ="' + url + '" type="audio/mp3" controls/>';
             this.$el.html($audio);
        }
    });
});