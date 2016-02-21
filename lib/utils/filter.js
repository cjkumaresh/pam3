exports.getProperFiles = function(file) {
    var keys = ['txt', 'xls', 'xlsx', 'mp3', 'mp4', 'jpg', 'png' ];
    if (file.indexOf('.') == -1) {
        return true;
    } else {
        if (keys.indexOf(file) !== -1) {
            return true;
        } else {
            return false;
        }
    }
}