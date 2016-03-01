'use strict';
define([
    'jquery',
    'views/FileSystemView',
    'views/MediaView',
    'views/AudioView',
    'utils/audio'
],function ($, FileSystemView, MediaView, AudioView, Audio) {
   return {
       handle: function (path) {
           if (path.endsWith('.mp3')) {
               new AudioView({
                   model: path
               });     
           } else {
               Audio.stopAudio();
               fileNav(path);
           }
       }
   } 
    function fileNav (path) {
        var params = {
            url: 'navigate',
            type: 'POST',
            data: {'path': path}
        },
        
        callback = function (data) {
            if (data.files) {
                new FileSystemView({
                    model: data
                });    
            } else {
                new MediaView({
                    model: JSON.parse(data)
                });
            }
        };
        
        $.ajax(params).done(callback);
    }
});