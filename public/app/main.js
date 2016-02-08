'use strict';
define([
    'jquery',
    'underscore',
    'backbone',
], function ($, _, Backbone) {
    let AppView = Backbone.View.extend({
        initialize: function() {
            this.render();
        },
        render: function() {
            let variables = { app_name: "PAM-3" };
            let template = _.template( $("#title_template").html() );
            this.$el.html( template(variables) );
        }
    });

    let app_view = new AppView({ el: $("body") });
});