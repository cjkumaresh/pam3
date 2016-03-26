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
            var $file = '<div>' + this.model + '</div>';
            this.$el.html($file);
        }
    });
});