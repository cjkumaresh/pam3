'use strict';
define([
    'backbone'
], function (Backbone) {
    return Backbone.View.extend({
        el: '#view',
        
        initialize: function () {
            this.render();
        },
        
        render: function () {
            var url = '/file?path=' + this.model.replace(/\//g, 'pam3'),
                $file = '<div> Your file will be downloaded </div>' + 
                        '<iframe src ="' + url + '" height=0 width=0' +
                        'style="border: 0px"/>';
                        
             this.$el.html($file);
        }
    });
});