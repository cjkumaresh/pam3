'use strict';
define([
    'jquery',
    'underscore',
    'backbone'
],function ($, _, Backbone) {    
    return Backbone.View.extend({
        initialize: function () {
            this.render();
        },
            
        render: function () {
            this.$el.html('');
        }
    });    
});