CPWL.Intro = function (stage,config) {

    CPWL.Page.call(this,stage);

    this.modal = H.createEl("div", {
        position: "relative",
        width: "800px",
        height: "420px",
        borderRadius: "12px",
        backgroundColor: "#00E0FF"
    }, this.el);
    TweenLite.set(this.modal, {
        autoAlpha: 0.1
    });

    this.img = H.createImg(config.imgSrc, {
        position: "absolute",
        left: "0px",
        top: "0px",
        width: "312px",
        height: "420px"
    }, this.el, loader);
    TweenLite.set(this.img, {
        scale: 0.8
    });

    this.description = H.createEl("div", {
        position: "absolute",
        fontWeight: "bolder",
        fontHeight: "1.2em",
        color: "white",
        font: "Arial",
        width: "400px",
        left: "330px",
        top: "20px"
    }, this.el);
    this.description.innerHTML = config.introTextHtml;
    this.init();
};

CPWL.Intro.prototype = Object.create(CPWL.Page.prototype);
CPWL.Intro.prototype.constructor = CPWL.Intro;
CPWL.Intro.prototype.init = function () {
    var me = this;
    var split = new SplitText(me.description, {
        type: "chars"
    });
    this.split = split;

    H.centerY(me.description);

    me.launchTween.to(me.el, 0.3, {
        scaleY: 1,
        startAt: {
            scaleY: 0,
            autoAlpha: 1
        }
    }, 0)
        .addLabel("start")
        .add(H.createTweenTwinkleShow(me.img, function () {
            soundManager.play("alert2");
            setTimeout(function () {
                soundManager.play("calculations_n_text_constant_01");
            }, 1000);
        }), "start+=0.2")
        .to(me.close.el,0.3,{
            autoAlpha : 1,
            scale : 1,
            rotation : 0,
            startAt : {
                scale : 0,
                rotation : 90
            }
        },"start+=0.7")
        .staggerTo(split.chars, 0.0001, {
            autoAlpha: 1
        }, 0.004, "start+=1.2");

    me.quitTween.to(me.el, 0.3, {
        scaleY: 0,
        onComplete: function () {
            me.el.style.visibility = "hidden";
        }
    });
    me.reset();
};

CPWL.Intro.prototype.reset = function () {
    TweenLite.set([this.img, this.split.chars], {
        autoAlpha: 0
    });
};

CPWL.Intro.prototype.launchEffect = function () {
    soundManager.play("open_small_interface_10");
    this.launchTween.restart();
};

CPWL.Intro.prototype.quitEffect = function () {
    soundManager.play("close_small_interface_04");
    this.quitTween.restart();
};