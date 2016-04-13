'use strict';
define([
    'views/AppView'
], function (AppView) {
    return AppView.extend({
        el: '#view',
        
        initialize: function () {
            this.model.path = encodeURIComponent(this.model.path); 
            this.render();
        },
        
        render: function () {
             var url = '/image?path=' + this.model.path,
                 $image = '<img class="col-xs-12 media" src ="' + url + '"/>';
             this.$el.html($image);
        }
    });
});