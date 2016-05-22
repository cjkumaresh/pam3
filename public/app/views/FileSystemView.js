'use strict';
define([
    'jquery',
    'underscore',
    'views/AppView',
    'views/ErrorView'
], function ($, _, AppView, ErrorView) {    
    return AppView.extend({
        el: '#view',

        initialize: function () {
            this.model.location = location.href.split('#')[1] + '/';
            $('#nav-breadcrumb ol').html('');
            this.updateNav();    
            this.fetchFiles();
        },
        
        render: function () {
            var fileSystemTemplate = _.template($('#file-system-view-template').html());
            this.model.location = location.href.split('#')[1] + '/';
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
        },
        
        fetchFiles: function() {
            var that = this;
            $.ajax({ url: 'navigate', type: 'POST', data: { 'path': this.model.path } })
                .done(function(res) {
                    that.model = res;
                    that.files = res.files;
                    sessionStorage.setItem("pam-files", JSON.stringify(res.files));
                    that.render();
                })
                .error(function(response) {
                    new ErrorView({
                        model: response.responseText.split(',')[0]
                    });
                });
        }
    });    
});