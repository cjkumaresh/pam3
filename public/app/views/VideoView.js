'use strict';
define([
    'views/AppView'
], function (AppView) {
    return AppView.extend({
        el: '#view',

        initialize: function () {
            this.model.path = encodeURIComponent(this.model.path);
            this.$el.find('#file-system-view').html('');
            this.$el.find('#media-view').html('');
            this.render();
        },

        render: function () {
            var url = '/video?path=' + this.model.path,
                $video = '<video class="col-xs-12 media" src ="' + url + '" type="video/mp4" controls/>';
            this.$el.html($video);
        }

    });
});