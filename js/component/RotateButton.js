CPWL.RotateButton = function (lengthOfSide, bgSrc, iconSrc, parentEl, clickFunc, position) {
    var style = {
        position: "absolute",
        visibility: "hidden",
        cursor: "pointer",
        zIndex: "100",
        width: lengthOfSide + "px",
        height: lengthOfSide + "px"
    };
    $.extend(style, position);
    this.el = H.createEl("div", style, parentEl);
    this.bg = H.createImg(bgSrc, {
        position: "absolute"
    }, this.el);
    H.createImg(iconSrc, {
        position: "absolute"
    }, this.el);

    var me = this;
    me.hoverAnimation = TweenLite.to(me.bg, 0.2, {
        rotation: 90,
        paused: true
    });
    var $bg = $(me.el);
    $bg.hover(function () {
        me.hoverAnimation.play();
    }, function () {
        me.hoverAnimation.reverse();
    });
    $bg.click(clickFunc);

};
