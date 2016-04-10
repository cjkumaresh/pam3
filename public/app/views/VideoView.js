'use strict';
define([
    'views/AppView'
], function (AppView) {
    return AppView.extend({
        el: '#view',

        initialize: function () {
            this.$el.find('#file-system-view').html('');
            this.$el.find('#media-view').html('');
            this.render();
        },

        render: function () {
            var url = '/video?path=' + this.model.replace(/\//g, 'pam3'),
                $video = '<video class="col-xs-12 media" src ="' + url + '" type="video/mp4" controls/>';
            this.$el.html($video);
        }

    });
});