define([
    'jquery'
], function ($) {
    var swipe = function (swipeDirection) {
        var currentFile = "";
        var url = location.href.split("/");
        var index = 0;
        var newFile = "";
        currentFile = url[url.length - 1];
        this.files = JSON.parse(sessionStorage.getItem("pam-files"));
        index = this.files.indexOf(currentFile);

        if (index !== -1 && currentFile.split('.')[1]) {
            if (swipeDirection === "prev" && index !== 0) {
                index--;
                newFile = this.files[index];
            } else if (swipeDirection === "next") {
                index++;
                newFile = this.files[index];
            }
        }

        if (newFile) {
            url[url.length - 1] = newFile;
            location.href = url.join("/");
        }
    }
    return swipe;
});
