var CPWL = {};

/**
 * 整个页面的控制器，全局变量：site
 * @constructor
 */
CPWL.Site = function(config){
    //网站容器
    this.el = H.createEl('div', {
        overflow: 'hidden',
        position: 'absolute',
        zIndex:"1",
        backgroundColor:'black'
    },document.body);
    this.menuHeight = 40;
    //舞台
    this.stage = new CPWL.Stage(this.el,this.menuHeight);
    //菜单
    this.menu = new CPWL.Menu(this.el,this.menuHeight,this.stage,config.menu);
    //背景
    this.splash = new CPWL.Splash(this);
    //欢迎动画
    this.welcome = new CPWL.Welcome(this.stage);
    this.init();
};

CPWL.Site.prototype = {
    constructor:CPWL.Site,
    init : function(){
        $(window).resize($.proxy(this.resize, this));
        this.resize();
        loader.start()
    },
    resize : function(){
        var me = this;

        G.screenWidth = $(window).width();
        G.screenHeight = $(window).height();

        me.el.style.width = G.screenWidth + 'px';
        me.el.style.height = G.screenHeight + 'px';

        this.splash.resize();
        this.stage.resize();
        this.menu.resize();
        this.welcome.resize();
    },
    start : function(){
        var me = this;
        this.splash.start(function(){

            setTimeout(function () {
                me.welcome.launch();
            },1000);
            setTimeout(function () {
                me.menu.start();
            },2000);
        });
    }
};

