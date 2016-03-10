'use strict';
define([
    'backbone'
],function (Backbone) {    
    return Backbone.View.extend({
        initialize: function () {
            this.render();
        },
            
        render: function () {
            this.$el.html('');
        }
    });    
});