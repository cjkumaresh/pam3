define(function () {
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    var context = new AudioContext(),
        self;
        
        return {
            getAudio: function (path) {
                var request = new XMLHttpRequest(),
                    url = '/music?path=' + path.replace(/\//g, 'pam3'); 
                request.open("GET", url, true); 
                request.responseType = "arraybuffer"; 

                request.onload = function() {
                    var data = request.response;
                    playAudio(data, context);
                };

                request.send();
            },
            
            stopAudio: function () {
                pauseAudio(context);
            }
       }
});

function playAudio(data, context) {
    var source = context.createBufferSource();
    context.decodeAudioData(data, function(buffer) {
        source.buffer = buffer;
        source.connect(context.destination); 
        source.start(context.currentTime);
        self = source;
    });
}

function pauseAudio(context, source) {
    if (self)
        self.stop(0);
}