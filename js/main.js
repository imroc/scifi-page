var loader = new PxLoader(),
    site,
    G = {
        screenWidth: 0,
        screenHeight: 0,
        w: $(window)
    };


$(document).ready(function () {

    soundManager.debugMode = false;

    // initialize the sound manager
    soundManager.url = 'assets/sound_manager';
    soundManager.flashVersion = 9;
    soundManager.useHighPerformance = true; // reduces delays

// reduce the default 1 sec delay to 500 ms
    soundManager.flashLoadTimeout = 500;

// mp3 is required by default, but we don't want any requirements
    soundManager.audioFormats.mp3.required = false;

// flash may timeout if not installed or when flashblock is installed
    soundManager.ontimeout(function (status) {
        // no flash, go with HTML5 audio
        soundManager.useHTML5Audio = true;
        soundManager.preferFlash = false;
        soundManager.reboot();
        console.log("reboot...");
    });

    soundManager.onready(init);

    function init() {
        var loading = new Loading(),
            $progressBar = $("#progress-container div");
        //开始加载资源
        loader.addProgressListener(function (e) {
            TweenLite.to($progressBar, 0.2, {
                width: (e.completedCount / e.totalCount) * 100 + "%"
            });
        });
        loader.addCompletionListener(function () {
            loading.end(function () {
                setTimeout(function () {
                    site.start();
                }, 2500)
            });
        });
        //加载资源
        H.addAudio(
            "navroll", "click", "cal_text", "appear1",
            "open_small_interface_10", "close_small_interface_04",
            "alert1", "alert2","calculations_n_text_constant_01",
            "slider"
        );
        site = new CPWL.Site(config);
    }

});