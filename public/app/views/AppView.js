'use strict';
define([
    'jquery',
    'backbone',
    'utils/swipe'
], function ($, Backbone, swipe) {    
    return Backbone.View.extend({
        el: 'body',

        files: [],
        
        events: {
            'click .prevBtn, .nextBtn': 'handleNavigate'
        },
        
        initialize: function () {
            this.render();
        },
            
        render: function () {
        },
        
        handleNavigate: function (e) {
            var swipeDirection = $(e.target).text();
            swipe(swipeDirection); 
        }
    });    
}); 