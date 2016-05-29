'use strict';
define([
    'jquery',
    'backbone'
], function ($, Backbone) {
    return Backbone.View.extend({
        el: 'body',

        files: [],

        events: {
            'click .homePaths': 'setHome'
        },

        initialize: function () {
            this.fetchHomes();
        },

        render: function () {
            if (this.model.frequentHomePaths.length !== 0) {
                var homeMenuTemplate = _.template($('#home-menu-template').html());
                this.$el.find('.navbar-header').append(homeMenuTemplate(this.model));
            }
        },

        fetchHomes: function () {
            var that = this;
            $.ajax({ url: 'getHomes', type: 'GET'})
                .done(function (res) {
                    that.model = JSON.parse(res);
                    that.render();
                });
        },

        setHome: function (e) {
            var homePath = $(e.target).text();
            e.preventDefault();
            $.ajax({ url: 'setHome', type: 'GET', data: {'home': homePath} })
                .done(function (res) {
                    location.href = location.origin;
                });
        }
    });
});
