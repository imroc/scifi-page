CPWL.Video = function (stage,config) {
    var me = this;
    CPWL.Gallery.call(this,stage,config);

    this.config = config;
    this.video = new CPWL.VideoPlayer(stage,this);

    this.playButton = new CPWL.PlayButton(this.el, function () {
        //TweenMax.to(me.el,0.2,{
        //    autoAlpha : 0
        //});
        //TweenMax.to(me.video.el,0.3,{
        //    startAt : {
        //        autoAlpha : 1,
        //        scaleY : 0
        //    },
        //    scaleY : 1,
        //    onStart : function () {
        //        soundManager.play("click");
        //    }
        //});
        me.showTween.restart();
        me.video.play(me.config[me.currentIndex].videoSrc);
    });

    me.showTween = new TimelineMax({
        paused : true
    });
    me.showTween
        .to(me.el,0.2,{
            autoAlpha : 0
        })
        .to(me.video.el,0.3,{
            startAt : {
                autoAlpha : 1,
                scaleY : 0
            },
            scaleY : 1,
            onStart : function () {
                soundManager.play("click");
            }
        },0)
        .to(me.video.close.el,0.3,{
            autoAlpha : 1,
            scale : 1,
            ease : Back.easeOut,
            startAt : {
                scale : 0
            }
        },"+=0.4");


    this.launchTween.add(H.createTweenTwinkleShow(this.playButton.el));
};

CPWL.Video.prototype = Object.create(CPWL.Gallery.prototype);
CPWL.Video.prototype.constructor = CPWL.Video;
CPWL.Video.prototype.resizeExtra = function () {
    H.center(this.playButton.el);
    H.center(this.video.el);

};