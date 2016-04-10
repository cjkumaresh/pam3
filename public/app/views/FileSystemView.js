'use strict';
define([
    'jquery',
    'underscore',
    'views/AppView',
    'models/FilesModel'
], function ($, _, AppView, FilesModel) {    
    return AppView.extend({
        el: '#view',
        
        initialize: function () {
            this.model.location = location.href.split('#')[1] + "/";
            $('#nav-breadcrumb ol').html('');
            this.updateNav();    
            this.render();
        },
        
        render: function () {
            var fileSystemTemplate = _.template($("#file-system-view-template").html());
            this.$el.html(fileSystemTemplate(this.model));
            return this;
        },
        
        updateNav: function () {
            
            var link = '#/';
            _.each(this.model.location.split('/'), function (element) {
                if (element !== '') {
                    var $li= $('<li><a href=""></a></li>');
                    link = link + element + '/';
                    $li.find('a').attr('href', link).html(element); 
                    $('#nav-breadcrumb ol').append($li); 
                }
            });
        }
        
        
    });    
});