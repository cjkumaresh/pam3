'use strict';
define([
    'jquery',
    'underscore',
    'backbone',
    'views/AppView',
    'router'
], function ($, _, Backbone, AppView, AppRouter) {
    new AppRouter();
    new AppView();
    Backbone.history.start();
});