define([
    'backbone',      
], function(Backbone) {
     return Backbone.View.extend({
         el: '#view',
         
         initialize: function () {
             this.$el.find('#file-system-view').html('');
             this.$el.find('#media-view').html('');
             this.render();
         },
         
         render: function () {
             var url = '/video?path=' + this.model.replace(/\//g, 'pam3'),
                 $video = '<video class="col-xs-12" src ="' + url + '" type="video/mp4" controls/>';
             this.$el.html($video);
         }
         
     });   
});