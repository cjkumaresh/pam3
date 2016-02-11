'use strict';
define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    return Backbone.Model.extend({
       url: 'getFiles',
       parse: function(data) {
           return data;
       }
    });
});