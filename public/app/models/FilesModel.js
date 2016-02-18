'use strict';
define([
    'jquery',
    'underscore',
    'backbone',
    'views/FileSystemView'
], function ($, _, Backbone, FileSystemView) {
    return Backbone.Model.extend({
       url: 'getFiles',
       parse: function(data) {
           //return data;
           new FileSystemView({'files': data });
       }
    });
});