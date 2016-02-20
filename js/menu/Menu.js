CPWL.Menu = function(parentEl,menuHeight,stage,config){
    console.log("Menu constructed...");
    this.el = H.createEl("div",{
        minWidth : "500px",
        position:"absolute",
        width : "100%",
        top : "0px",
        height : menuHeight+"px"
    },parentEl);

    this.wrapper = H.createEl("div",{
        display : "inline-block",
        height : "100%",
        position : "relative"
    },this.el);


    this.stage = stage;

    if(config.intro){
        this.pageIntro = new CPWL.Intro(stage,config.intro);
        this.intro = this.createMenuItem("个人简介",this.pageIntro);
    }

    if(config.photo){
        this.pagePhoto = new CPWL.Gallery(stage,config.photo);
        this.photo = this.createMenuItem("相册",this.pagePhoto);
    }

    if(config.video){
        this.pageVideo = new CPWL.Video(stage,config.video);
        this.video = this.createMenuItem("视频",this.pageVideo);
    }
    //this.video = this.createMenuItem("视频");
    //this.works = this.createMenuItem("作品");

    this.wrapperWidth = $(this.wrapper).width();

    this.init();
};

CPWL.Menu.prototype = {
    constructor : CPWL.Menu,
    init : function(){
    },
    createMenuItem : function(title,page){
        return new CPWL.MenuItem(this,title,page);
    },
    resize : function(){
        this.wrapper.style.left = H.centerVal(G.screenWidth,this.wrapperWidth)+"px";
        this.pageIntro.resize();
        this.pageVideo.resize();
        this.pagePhoto.resize();
    },
    start : function(){
        TweenMax.staggerFromTo([this.intro.el,this.photo.el,this.video.el],0.2,{
            scaleY :0,
            autoAlpha : 0.7
        },{
            scaleY : 1,
            ease:Back.easeOut
        },0.1);

    }
};