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
            this.$el.swipe({
                swipe: function (event, direction) {
                    swipe(direction);
                },
                allowPageScroll:"auto"
            });
            this.render();
        },

        render: function () {
             var url = '/image?path=' + this.model.path,
                 $image = '<img class="col-xs-12 media" src ="' + url + '"/>';
             this.$el.html($image);
        }
    });
});
