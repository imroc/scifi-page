CPWL.Gallery = function (stage,config){
    CPWL.Page.call(this,stage);

    this.modal = H.createEl("div",{
        position : "absolute",
        borderRadius: "12px",
        backgroundColor: "#00E0FF"
    },this.el);
    TweenLite.set(this.modal, {
        autoAlpha: 0.1
    });

    var me = this;
    this.img = [];
    this.currentIndex = 0;

    this.leftArrow = new CPWL.LeftArrow(this.el,function(){
        me.pre();
    });

    this.rightArrow = new CPWL.RightArrow(this.el,function(){
        me.next();
    });
    var wrap,img;
    for(var key in config){
        wrap = H.createEl("div",{
            visibility : "hidden",
            position : "absolute",
            width : "100%",
            height : "100%"
        },this.el);
        img = H.createImg(config[key].imgSrc,{
            margin : "0 auto",
            display : "block",
            maxWidth : "100%",
            maxHeight : "100%"
        },wrap);
        wrap.show = function () {
            TweenMax.to(this,0.6,{
                autoAlpha : 1
            });
        };
        wrap.hide = function () {
            TweenMax.to(this,0.1,{
                autoAlpha : 0
            });
        };
        this.img.push(wrap);
    }
    this.imgLength = this.img.length;
    this.init();
};

CPWL.Gallery.prototype = Object.create(CPWL.Page.prototype);
CPWL.Gallery.prototype.constructor = CPWL.Gallery;

CPWL.Gallery.prototype.init = function () {
    var me = this;
    this.launchTween.to(this.el,0.3,{
        scaleX : 1,
        startAt : {
            scaleX : 0,
            autoAlpha : 1
        },
        onComplete : function () {
            me.showCurrent();
        }
    }).staggerTo([me.close.el,me.leftArrow.el,me.rightArrow.el],0.2,{
        autoAlpha : 1,
        scale : 1,
        ease : Back.easeOut,
        startAt : {
            scale : 0
        }
    },0.1,"+=0.5");

    this.quitTween.to(this.el,0.3,{
        scaleX : 0
    });

};

CPWL.Gallery.prototype.showCurrent = function () {
    this.img[this.currentIndex].show();
};

CPWL.Gallery.prototype.pre = function(){
    this.img[this.currentIndex].hide();
    this.currentIndex--;
    if(this.currentIndex<0){
        this.currentIndex = this.imgLength-1;
    }
    this.showCurrent();
    soundManager.play("click");
};

CPWL.Gallery.prototype.next = function(){
    this.img[this.currentIndex].hide();
    this.currentIndex=(++this.currentIndex)%this.imgLength;
    this.showCurrent();
    soundManager.play("click");
};

CPWL.Gallery.prototype.launchEffect = function () {
    soundManager.play("open_small_interface_10");
    this.launchTween.restart();
};

CPWL.Gallery.prototype.quitEffect = function () {
    soundManager.play("close_small_interface_04");
    this.quitTween.restart();
    TweenMax.set(this.img[this.currentIndex],{
        autoAlpha : 0
    })
};

CPWL.Gallery.prototype.resize = function () {
    var $parent = $(this.el.parentNode);
    TweenMax.set(this.el,{
        width : $parent.width()-50+"px",
        height : $parent.height()-50+"px"
    });
    H.center(this.el);
    H.centerY(this.leftArrow.el);
    H.centerY(this.rightArrow.el);
    H.fillParent(this.modal);

    this.resizeExtra();
};

CPWL.Gallery.prototype.resizeExtra = function () {

};