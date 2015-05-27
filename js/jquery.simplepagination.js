$(window).load(function () {
    "use strict";
    var leftPosition, liTotalWidth, marginPerLi, methods, remainedSpace, thumbPosition, totalThumbPerPage, videoContainerWidth, videoUlWidth, _li;
    videoContainerWidth = $(".video-container").width();
    thumbPosition = $(".thumb-pagination");
    leftPosition = parseInt(thumbPosition.css("left"));
    _li = $(".thumb-pagination li");
    totalThumbPerPage = Math.floor(videoContainerWidth / _li.outerWidth());
    remainedSpace = videoContainerWidth - (_li.width() * totalThumbPerPage);
    marginPerLi = remainedSpace / totalThumbPerPage;
    liTotalWidth = _li.outerWidth() + marginPerLi;
    videoUlWidth = _li.length * liTotalWidth;
    methods = {
        init: function (options) {
            var o, self;
            o = $.extend({
                width: _li.outerWidth(),
                show: false,
                prevText: "Prev",
                nextText: "Next",
                marginLeft: marginPerLi,
                cssStyle: "light-theme",
                invertPageOrder: false
            }, options || {});
            return self = $(this);
        },
        oninit: function () {
            $(".thumb-pagination").parent().fadeIn();
            _li.css("margin-right", marginPerLi);
            $(".thumb-pagination").css("width", videoUlWidth);
            $(".main-container").prepend("<a href='javascript:void(0)' class='prev'>prev</a>").append("<a href='javascript:void(0)'  class='next'>next</a>");
            if (leftPosition >= 0) {
                $(".prev").addClass("deselect");
            }
            if (thumbPosition.width() < videoContainerWidth) {
                return $(".next").addClass("deselect");
            }
        },
        prev: function () {
            var leftPos;
            leftPos = parseInt($(".thumb-pagination").css("left"));
            console.log(leftPos);
            if (leftPos >= 0) {
                $(".prev").addClass("deselect");
                return false;
            } else {
                $(".prev").removeClass("deselect");
                return thumbPosition.animate({
                    left: "+=" + parseInt(videoContainerWidth)
                });
            }
        },
        next: function () {
            var leftPos;
            leftPos = parseInt($(".thumb-pagination").css("left"));
            if (-leftPos >= (thumbPosition.width() - videoContainerWidth)) {
                $(".next").addClass("deselect");
                return false;
            } else {
                $(".next, .prev").removeClass("deselect");
                return thumbPosition.animate({
                    left: "-=" + parseInt(videoContainerWidth)
                });
                
                
            }
        }
    };
    $.fn.pagination = function (method) {
        if (methods[method] && method.charAt(0) !== "_") {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === "object" || !method) {
            return methods.init.apply(this, arguments);
        } else {
            return $.error("Method \"" + method + "\" does not exist on this. Please check the code.");
        }
    };
    $(".thumb-pagination").pagination("oninit");
    $(document).on("click", ".main-container .prev", function () {
        return $(".thumb-pagination").pagination("prev");
    });
    return $(document).on("click", ".main-container .next", function () {
        return $(".thumb-pagination").pagination("next");
    });
});