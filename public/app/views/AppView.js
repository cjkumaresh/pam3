'use strict';
define([
    'jquery',
    'underscore',
    'backbone'
],function ($, _, Backbone) {    
    return Backbone.View.extend({
        initialize: function () {
            this.$el.html('');
            this.render();
        },
            
        render: function () {
            var variables = { app_name: "PAM-3" };
            var template = _.template( $("#title_template").html() );
            this.$el.append(template(variables));
        }
    });    
});