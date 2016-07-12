'use strict';
define([
    'jquery',
    'views/AppView',
    'utils/swipe',
    'jquerySwipe'
], function ($, AppView, swipe) {
    return AppView.extend({
        el: '#view',

        initialize: function () {
            this.model.path = encodeURIComponent(this.model.path);
            this.$el.find('#file-system-view').html('');
            this.$el.find('#media-view').html('');
            this.$el.swipe({
                swipe: function (event, direction) {
                    swipe(direction);
                },
                allowPageScroll:"auto"
            });
            this.render();
        },

        render: function () {
            var url = '/video?path=' + this.model.path,
                $video = '<video class="col-xs-12 media" src ="' + url + '" type="video/mp4" controls/>';
            this.$el.html($video);
        }

    });
});
