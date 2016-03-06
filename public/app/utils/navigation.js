'use strict';
define([
    'jquery',
    'views/ErrorView',
    'views/FileSystemView',
    'views/MediaView',
    'views/AudioView',
    'utils/audio',
    'views/VideoView',
    'views/ImageView'
],function ($, ErrorView, FileSystemView, MediaView, AudioView, Audio, VideoView, ImageView) {
   return {
       handle: function (path) {
           if (path.endsWith('.mp3')) {
               new AudioView({
                   model: path
               });     
           } else if (path.endsWith('.mp4') || path.endsWith('.MKV') || path.endsWith('.mkv')) {
               new VideoView({
                   model: path    
               });
           } else {
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
        
        callback = function (response, status, xhr) {
            var ct = xhr.getResponseHeader('content-type') || '';
            if (response.files) {
                new FileSystemView({
                    model: response
                });    
            } else if (ct.indexOf('text') > -1) {
                new MediaView({
                    model: response
                });
            } else if (ct.indexOf('json') > -1) {
                if (response.status === 'error') {
                    new ErrorView({
                        model: response.src
                    });    
                } else {
                    new ImageView({
                        model: response 
                    });
                }
            } else {
                new ErrorView({
                    model: 'File format not supported or Something went wrong'
                });
            }
        };
        
        $.ajax(params).done(callback).error(function (response) {
            new ErrorView({
                model: response.responseText.split(',')[0]
            });
        });
    }
});