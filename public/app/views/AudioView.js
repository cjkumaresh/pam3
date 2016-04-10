'use strict';
define([
    'views/AppView'
], function (AppView) {
    return AppView.extend({
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