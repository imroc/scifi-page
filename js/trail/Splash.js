CPWL.Splash = function(site){
    console.log("splash constructed...");
    this.el = H.createEl("div",{
        position: 'absolute',
        top: '0px',
        left: '0px',
        width : '100%',
        height : '100%',
        zIndex : "-1"
    },site.el);

    this.elStyle = this.el.style;

    //鼠标跟踪特效
    this.canvas = H.createEl('canvas', {
        position: 'absolute',
        top: '0px',
        left: '0px'
    },this.el);
    this.trail = new CPWL.Trail(this.canvas.getContext('2d'),site);

    //加载完成的视频闪现
    this.what = H.createVideo("assets/video/what.mp4",{
        position:"absolute",
        visibility : 'hidden'
    },this.el,loader);

    //this.site = site;

    this.init();
};

CPWL.Splash.prototype = {
    constructor:CPWL.Splash,
    init : function(){

        var me = this;
        this.resizeWhat();
        $(window).bind("resize", $.proxy(this.resizeWhat,this));
        $(window).bind("resize", $.proxy(this.resizeWhat,this));
        $(this.what).bind("ended", $.proxy(this.endWhat,this));
    },
    start : function(videoEndCallBack){
        if(videoEndCallBack){
            $(this.what).bind("ended", videoEndCallBack);
        }
        this.what.style.visibility = "visible";
        this.what.play();
        this.trail.start();
    },
    resize : function(){
        var me = this;
        me.elStyle.width = G.screenWidth+"px";
        me.elStyle.height = G.screenHeight+"px";
        me.canvas.width = G.screenWidth;
        me.canvas.height = G.screenHeight;
    },
    endWhat : function(){
        this.what.style.display = "none";
        $(window).unbind("resize", $.proxy(this.resizeWhat,this));
        //this.site.menu.start();
    },
    resizeWhat : function(){
        var videoRatio = 900/506,
            screenWidth = G.w.width(),
            screenHeight = G.w.height(),
            screenRatio = screenWidth/screenHeight;
        if(screenRatio>videoRatio){
            this.what.width = screenWidth;
            this.what.height = screenWidth/videoRatio;
        }else{
            this.what.height = screenHeight;
            this.what.width = screenHeight*videoRatio;
        }
    }
};
