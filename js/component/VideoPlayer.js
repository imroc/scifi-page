CPWL.VideoPlayer = function (parent,videoPage) {
    var me = this;
    this.el = H.createEl("div",{
        visibility : "hidden",
        position : "absolute"
    },parent.el);

    this.video = H.createEl("video",{
    },this.el);
    this.video.width = 900;
    this.video.height = 500;
    this.video.autoplay = "autoplay";
    this.video.controls = "controls";
    this.video.className="video-js";
    videojs(this.video);

    this.close = new CPWL.Close(this.el, function () {
        TweenMax.to(videoPage.el,0.5,{
            autoAlpha : 1
        });
        TweenMax.to(me.el,0.3,{
            scaleY : 0,
            onStart : function () {
                soundManager.play("click");
            }
        });
        me.video.pause();
    });

    this.init();
};

CPWL.VideoPlayer.prototype = {
    constructor : CPWL.VideoPlayer,
    init : function () {

    },
    play : function (src) {
        this.video.src = src;
    }
};