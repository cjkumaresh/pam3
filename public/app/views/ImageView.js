'use strict';
define([
    'views/AppView'
], function (AppView) {
    return AppView.extend({
        el: '#view',
        
        initialize: function () {  
            this.render();
        },
        
        render: function () {
             var url = '/image?path=' + this.model.path.replace(/\//g, 'pam3'),
                 $image = '<img class="col-xs-12 media" src ="' + url + '"/>';
             this.$el.html($image);
        }
    });
});