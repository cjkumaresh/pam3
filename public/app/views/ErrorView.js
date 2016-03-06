'use strict';
define([
    'jquery',
    'underscore',
    'backbone'
],function($, _, Backbone){
    return Backbone.View.extend({
        el: '#view',
               
        initialize: function () {  
            this.render();
        },
        
        render: function () {
            var $error = '<div class="alert alert-danger" role="alert"> <strong>Oops!</strong> ' +
                         this.model +  '</div>';
            this.$el.html($error);
        }
    });
});