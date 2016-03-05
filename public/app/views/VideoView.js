define([
    'jquery',
    'underscore',
    'backbone',      
], function($, _, Backbone) {
     return Backbone.View.extend({
         el: 'body',
         
         initialize: function () {
             this.$el.find('#file-system-view').html('');
             this.$el.find('#media-view').html('');
             this.render();
         },
         
         render: function () {
             var url = '/video?path=' + this.model.replace(/\//g, 'pam3'),
                 videoSrc = '<video src ="' + url + '" type="video/mp4" controls/>';
             this.$el.append(videoSrc);
         }
         
     });   
});