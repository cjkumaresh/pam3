'use strict';
define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone, FileSystemView) {
    return Backbone.Model.extend({
       url: 'getFiles',
       
       defaults: {
           path: '',
           data: ''
       },
       
       parse: function(data) {
           this.set(data);
           return this;
       }
    });
});