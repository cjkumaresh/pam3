'use strict';
define([
    'backbone'
],function(Backbone) {
    return Backbone.View.extend({
        el: '#view',
        
        initialize: function () {  
            this.render();
        },
        
        render: function () {
            var imgSrc = 'data:image/jpg;base64,' + this.model.src,
                $img = '<img class="col-xs-12 media" src="' + imgSrc + '"/>';
            this.$el.html($img);
        }
    });
});