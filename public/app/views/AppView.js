'use strict';
define([
    'jquery',
    'backbone'
], function ($, Backbone) {    
    return Backbone.View.extend({
        el: 'body',

        files: [],
        
        events: {
            'click .prevBtn, .nextBtn': 'handleNavigate'
        },
        
        initialize: function () {
            this.render();
        },
            
        render: function () {
        },
        
        handleNavigate: function (e) {
            var currentFile = "";
            var url = location.href.split("/");
            var index = 0;
            var newFile = "";
            currentFile = url[url.length - 1];
            this.files = JSON.parse(sessionStorage.getItem("pam-files"));
            index = this.files.indexOf(currentFile);
            
            if (index !== -1 && currentFile.split('.')[1]) {
                if ($(e.target).text() === "prev" && index !== 0) {
                    index--;
                    newFile = this.files[index];
                } else if ($(e.target).text() === "next") {
                    index++;
                    newFile = this.files[index];
                }
            }
            
            if (newFile) {
                url[url.length - 1] = newFile;
                location.href = url.join("/");
            }
             
        }
    });    
}); 