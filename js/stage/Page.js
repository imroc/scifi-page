CPWL.Page = function (stage) {
    var me = this;

    this.el = H.createEl("div", {
        visibility: "hidden",
        position: "absolute"
    }, stage.el);

    this.isLaunch = false;
    this.stage = stage;
    this.close = new CPWL.Close(this.el, function () {
        if(!stage.isBusy){
            me.quit();
        }
    });
    this.initTween();
};

CPWL.Page.prototype = {
    initTween: function () {
        var me = this;

        function _createTween() {
            var tl =  new TimelineMax({
                paused: true,
                onComplete : function () {
                    me.stage.isBusy = false;
                },
                onStart : function () {
                    me.stage.isBusy = true;
                }
            });
            return tl;
        }

        this.launchTween = _createTween();
        this.quitTween = _createTween();

    },

    launch: function () {
        this.isLaunch = true;
        this.stage.hasPage = true;
        this.launchEffect();
    },

    quit: function () {
        this.isLaunch = false;
        this.quitEffect();
        this.stage.hasPage = false;
    },

    resize: function () {
        H.center(this.el);
    },

    _toggle: function () {
        if (this.isLaunch) {
            this.quit();
        } else if(!this.stage.hasPage){
            this.launch();
        }
    },

    toggle: function () {
        if (!this.stage.isBusy) {
            this._toggle();
        }
    }

};