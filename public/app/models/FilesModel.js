'use strict';
define([
    'jquery',
    'underscore',
    'backbone',
    'views/FileSystemView'
], function ($, _, Backbone, FileSystemView) {
    return Backbone.Model.extend({
       url: 'getFiles',
       defaults: {
           path: '',
           data: '',
           caller: ''
       },
       parse: function(data) {
           this.set(data);
           this.set({
               caller: this
           });
           new FileSystemView(this);
       }
    });
});