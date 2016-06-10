'use strict';

module.exports = function(small, medium, large) {
    small = small || 600;
    medium = medium || 960;
    large = large || 1280;

    var ua = window.navigator.userAgent.toLowerCase();
    var width = window.screen.width;
    var height = window.screen.height;
    if(ua.indexOf('android') != -1){
        if(ua.indexOf('mobile') != -1){
            if(small < width){
                var ratio = small / width;
                width = small;
                height *= ratio;
            }
        } else {
            if(medium < width){
                var ratio = medium / width;
                width = medium;
                height *= ratio;
            }
        }
    }

    var viewport = document.createElement('meta');
    viewport.setAttribute('name', 'viewport');
    viewport.setAttribute('content', 'width=' + small);
    document.getElementsByTagName('head')[0].appendChild(viewport);

    function onOrientationChange(e) {
        var target;
        if (window.innerHeight > window.innerWidth) {
            target = width;
        } else {
            target = height;
        }

        if (target <= small) {
            viewport.setAttribute('content', 'width=' + small);
        } else if (target <= medium) {
            viewport.setAttribute('content', 'width=' + medium);
        } else {
            viewport.setAttribute('content', 'width=' + large);
        }
    }

    window.addEventListener("orientationchange", onOrientationChange, false);
    onOrientationChange();
}
