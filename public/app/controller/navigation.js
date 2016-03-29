'use strict';
define([
    'jquery',
    'views/ErrorView',
    'views/FileSystemView',
    'views/MediaView',
    'views/AudioView',
    'views/VideoView',
    'views/ImageView'
], function ($, ErrorView, FileSystemView, MediaView, AudioView, VideoView, ImageView) {
    return {
        handle: function (path) {
            var ext = path.slice((path.lastIndexOf(".") - 1 >>> 0) + 2).toLowerCase(),
                data = {
                    model: path
                };

            switch (ext) {
                case 'mp3':
                    new AudioView(data);
                    break;

                case 'mp4':
                case 'mkv':
                    new VideoView(data);
                    break;

                case 'jpg':
                case 'jpeg':
                case 'png':
                    new ImageView(data);
                    break;
                    
                case 'txt':
                case 'doc':
                case 'docx':
                case 'xls':
                case 'xlsx':
                    new MediaView(data);
                    break;
                    
                default:
                    renderCommonView(path);
                    break;
            };

        }
    }

    function renderCommonView (path) {

        $.ajax({
            url: 'navigate',
            type: 'POST',
            data: { 'path': path }
        })
        
        .done(function (res) {
            new FileSystemView({ model: res });
        })
        
        .error(function (response) {
            new ErrorView({
                model: response.responseText.split(',')[0]
            });
        });
    }
});