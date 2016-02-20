CPWL.Stage = function (parentEl,menuHeight) {

    this.el = H.createEl("div",{
        position : "absolute",
        width : "100%",
        overflow : "hidden",
        top : menuHeight+2+"px"
    },parentEl);

    this.menuHeight = menuHeight;

    this.height = 0;
    this.isBusy = false;
    this.hasPage = false;

    this.init();
};


CPWL.Stage.prototype = {
    constructor: CPWL.Site,
    init: function () {
    },
    updateHeight: function () {
        this.height = G.screenHeight - this.menuHeight - 2;
    },
    resize: function () {
        this.updateHeight();
        this.el.style.height = this.height + "px";
    }
};