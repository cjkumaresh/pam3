'use strict';
define([
    'backbone'
], function (Backbone) {
    return Backbone.View.extend({
        el: '#view',
        
        initialize: function () {  
            this.render();
        },
        
        render: function () {
             var url = '/image?path=' + this.model.replace(/\//g, 'pam3'),
                 $image = '<img class="col-xs-12 media" src ="' + url + '"/>';
             this.$el.html($image);
        }
    });
});