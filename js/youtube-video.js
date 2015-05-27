"use strict";
var lastTotvid, list_data, totalCount, totvidmain, _totalYtResults, _ytDataArray, _ytFeedLoader;
totalCount = 0;
list_data = "";
totvidmain = 0;
_ytFeedLoader = "";
_ytDataArray = "";
lastTotvid = void 0;
_totalYtResults = void 0;
$(document).ready(function() {
    var firstThumb, loadYtData, mainThumb, url, videoID, videoURL;
    loadYtData = function(val) {
        var ii;
        ii = 1;
        list_data = "";
        _ytFeedLoader = new oyejs.YtDataLoader(val, {
            onComplete: function() {
                return _totalYtResults = _ytFeedLoader.length;
            }
        });
        return _ytFeedLoader.getFeed({
            itemPerPage: 50,
            startIndex: 1,
            onComplete: function(data) {
                var bIsPS3, firstvideodisplay, youtubesrc;
                _ytDataArray = data;
                $(_ytDataArray).each(function(i, item) {
                    var f, feedTitle, thumb, url, videoID;
                    f = item.feed;
                    feedTitle = f.title;
                    videoID = f.videoId;
                    thumb = f.thumbUrl;
                    url = videoURL + videoID;
                    return list_data += "<li data-videoID=\"" + videoID + "\"><a href=\"javascript:void(0)\"><img width=\"100%\" src=\"" + thumb + "\" alt=\"" + feedTitle + "\" class=\"main-youtube-img\" /></a></li>";
                });
                $(".mainyoutubelist").html(list_data);
                $("#defaultContent").show();
                firstvideodisplay = $(".mainyoutubelist li:first").attr("data-videoID");
                youtubesrc = "http://www.youtube.com/embed/" + firstvideodisplay + "?autoplay=0&loop=0&modestbranding=1&rel=0&fs=0&iv_load_policy=3&autohide=1";
                bIsPS3 = navigator.userAgent.toLowerCase().indexOf("playstation") !== -1;
                $("#countrydivcontainer").prepend("<iframe id=\"youttubeiframe\" style=\"float:left;\" src=" + youtubesrc + " width=\"100%\" frameborder=\"no\" height=\"500\"></iframe>");
                return $(".mainyoutubelist li:first").addClass("selectedVideo");
            }
        });
    };
    window.onVideoStateChange = function(state) {
        if (state === 0) {
            return playNextVideo();
        }
    };
    window.playNextVideo = function() {
        var listItem, nextVideo, youtubesrc;
        listItem = $(".mainyoutubelist li.selectedVideo");
        lastTotvid = $(".mainyoutubelist li").index(listItem);
        if (lastTotvid < totalCount - 1) {
            nextVideo = $(".mainyoutubelist li.selectedVideo").next("li").attr("data-videoID");
            youtubesrc = "https://www.youtube.com/embed/" + nextVideo + "?autoplay=0&loop=0&modestbranding=1&rel=0&html5=1&fs=0&iv_load_policy=3&autohide=1";
            $("#youttubeiframe").attr("src", youtubesrc);
            $(".mainyoutubelist li.selectedVideo").next("li").addClass("selectedVideo");
            return $(".mainyoutubelist li.selectedVideo").prev("li").removeClass("selectedVideo");
        } else {
            return false;
        }
    };
    $(document).on("click", "#main .browser .grid .item a.bg", function() {
        $("#main .browser .grid .item .blueexpando").removeClass("nowplay");
        return $(this).parent().children(".blueexpando").addClass("nowplay");
    });
    $(document).on("click", "#main  .browser .grid .item h4 a", function() {
        $("#main .browser .grid .item .blueexpando").removeClass("nowplay");
        return $(this).parent().parent().children(".blueexpando").addClass("nowplay");
    });
    $(document).on("click", ".mainyoutubelist li a", function() {
        var firstvideodisplay, videoUrl, videoUrlm, youtubesrc;
        firstvideodisplay = $(this).parent().attr("data-videoID");
        videoUrl = $(this).parent().attr("videoUrl");
        youtubesrc = "https://www.youtube.com/embed/" + firstvideodisplay + "?autoplay=0&loop=0&modestbranding=1&rel=0&html5=1&fs=0&iv_load_policy=3&autohide=1";
        videoUrlm = $(this).parent().attr("data-videoID");
        videoUrlm = "https://www.youtube.com/embed/" + videoUrlm + "?rel=0&html5=1";
        $("#youttubeiframe").attr("src", videoUrlm);
        $(".mainyoutubelist li").removeClass("selectedVideo");
        return $(this).parent().addClass("selectedVideo");
    });
    videoURL = "https://www.youtube.com/watch?v=";
    mainThumb = "";
    firstThumb = "";
    videoID = "";
    url = "";
    window.playlistload = function(playListURLmain) {
        return loadYtData("https://www.youtube.com/playlist?list=" + playListURLmain);
    };
});
