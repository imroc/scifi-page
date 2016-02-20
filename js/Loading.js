function Loading() {

    //居中
    function centerVertical(){
        var height = $("#splash-animation").height(),
            screenHeight = $(window).height();
        $("#splash-animation").css("top",(screenHeight-height)/2+"px");
    }
    centerVertical();
    $(window).bind("resize",centerVertical);


    //主动画时间轴
    var tl = new TimelineMax({
        pause:true
    });
    //开场闪现进度条和文字
    tl.to("#progress-tip,#progress-container",0.6,{
        autoAlpha:1
    },0.6).fromTo("#rotate-circle",0.4,{
        scale:0,
        autoAlpha:1
    },{
        scale:0.8,
        ease:Back.easeOut
    },0.3);


    //进度闪烁
    var tlTwinkleProgress = new TimelineMax({
        pause: true,
        yoyo: true,
        repeat: 3
    });
    tlTwinkleProgress.to("#progress-tip,#progress-container", 0.04, {
        autoAlpha: 0.4,
        ease: Power0.easeNone
    });

    tl.add(tlTwinkleProgress, 1);

    //旋转球闪烁
    var tlTwinkleCircle = new TimelineMax({
        pause: true,
        yoyo: true,
        repeat: 7
    });
    tlTwinkleCircle.to("#rotate-circle", 0.04, {
        autoAlpha: 0.4,
        ease: Power0.easeNone
    });

    //旋转球循环闪烁
    var tlTwinkleCircleRepeat =  new TimelineMax({
        pause: true,
        repeat: -1,
        repeatDelay:1.5
    });
    tlTwinkleCircleRepeat.add(tlTwinkleCircle,0);
    tl.add(tlTwinkleCircleRepeat, 0.8);


    var tl6 = new TimelineMax({
        repeat: -1,
        pause: true
    });
    tl6.to("#circle-6", 2, {
        rotation: 360,
        svgOrigin: "250 250",
        ease: Power1.easeOut
    });
    tl.add(tl6, 0);

    var tl5 = new TimelineMax({
        repeat: -1,
        pause: true,
        yoyo: true
    });
    tl5.to("#circle-5", 1.5, {
        rotation: -100,
        svgOrigin: "250 250",
        ease: Back.easeInOut
    }).to("#circle-5", 1.8, {
        rotation: 200,
        svgOrigin: "250 250",
        ease: Back.easeInOut
    });
    tl.add(tl5, 0);

    var tl4 = new TimelineMax({
        pause: true,
        repeat: -1
    });
    tl4.to("#circle-4", 2.5, {
        rotation: 360,
        svgOrigin: "250 250",
        ease: Power0.easeNone
    });
    tl.add(tl4, 0);

    var tl3 = new TimelineMax({
        pause: true,
        repeat: -1
    });
    tl3.to("#circle-3", 2.8, {
        rotation: -180,
        svgOrigin: "250 250",
        ease: Elastic.easeOut.config(1, 0.3)
    }).to("#circle-3", 1.8, {
        rotation: -360,
        svgOrigin: "250 250",
        ease: SlowMo.ease.config(0.7, 0.7, false)
    });
    tl.add(tl3, 0);

    var tl2 = new TimelineMax({
        pause: true,
        repeat: -1
    });
    tl2.to("#circle-2", 2, {
        rotation: 360,
        svgOrigin: "250 250",
        ease: Power0.easeNone
    });
    tl.add(tl2, 0);

    var tl1 = new TimelineMax({
        pause: true,
        repeat: -1
    });
    tl1.to("#circle-1", 2, {
        rotation: -220,
        svgOrigin: "250 250",
        ease: Back.easeOut.config(4)
    }).to("#circle-1", 2, {
        rotation: -360,
        svgOrigin: "250 250",
        ease: Sine.easeInOut
    });
    tl.add(tl1, 0);

    tl.play();


    var progressContainer = $("#progress-container div");


    this.progress = function (percentage) {
        progressContainer.width(percentage+"%");
    };
    this.end = function(completeCallback){
        $("#progress-tip").css("color","#00E0FF").html("COMPLETE");
        //文字闪烁
        var tweenText = new TimelineMax({
            yoyo:true,
            repeat:7
        }).to("#progress-tip",0.05,{
            autoAlpha:0.4,
            ease:Power0.easeNone
        });
        //进度消失
        TweenMax.staggerTo("#rotate-circle,#progress-tip,#progress-container",0.3,{
            scale:0,
            delay:1
        },0.1);
        //容器消失
        TweenMax.to("#splash-container",1,{
            display:"none",
            delay:1.5
        });

        completeCallback();
    }

};