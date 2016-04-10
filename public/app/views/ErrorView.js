'use strict';
define([
    'views/AppView'
], function (AppView) {
    return AppView.extend({
        el: '#view',
               
        initialize: function () {  
            this.render();
        },
        
        render: function () {
            var $error = '<div class="alert alert-danger" role="alert"> <strong>Oops!</strong> ' +
                         this.model +  '</div>';
            this.$el.html($error);
        }
    });
});