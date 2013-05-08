
(function($) {

    var stack_bottomright = {"dir1": "up", "dir2": "left", "firstpos1": 25, "firstpos2": 25};
    $.pnotify.defaults.stack = stack_bottomright;
    $.pnotify.defaults.addclass = "stack-bottomright";
    $.pnotify.defaults.history = false;
    $.pnotify.defaults.maxonscreen = 4;
    $.pnotify.defaults.hide = false;
    $.pnotify.defaults.closer_hover = false;
    $.pnotify.defaults.sticker = false;
    $.pnotify.defaults.animate_speed = "fast";
    $.pnotify.defaults.animation = "slide";

    _alert = window.alert;
    window.alert = function(message) {
        $.pnotify({
            title: 'Alert',
            text: message,
            type: "notice"
        });
    };

//    Example Usage of PNotify:
//
//        $.pnotify({
//            title:"Test",
//            text: "this is a notify window",
//            type: "info"
//        });
//    $.pnotify({
//        title:"Test",
//        text: "this is a notify window",
//        type: "error"
//    });
//    $.pnotify({
//        title:"Test",
//        text: "this is a notify window",
//        type: "notice"
//    });
//    $.pnotify({
//        title:"Test",
//        text: "this is a notify window",
//        type: "success"
//    });


})(jQuery);
