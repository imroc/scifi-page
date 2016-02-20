var H = {};


//H.add = function(parent,child){
//    parent.el.appendChild(child.el);
//};

//H.playSoundLoop = function(soundId){
//    soundManager.play(soundId,{
//        onfinish:function(){
//            H.playSoundLoop(soundId);
//        }
//    });
//}

H.fillParent = function (el) {
    var $parent = $(el.parentNode);
    el.style.width = $parent.width()+"px";
    el.style.height = $parent.height()+"px";
};

H.createTweenTwinkleShow = function (el,onStart) {
    var tl = new TimelineMax({
        yoyo : true,
        repeat : 4
    });
    tl.to(el,0.06,{
        autoAlpha : 1
    });
    if(onStart){
        tl.eventCallback("onStart",onStart);
    }
    return tl;
};

H.centerVal = function(parentLength,selfLength){
    return (parentLength-selfLength)/2
};

H.addAudio = function(){
    var name,key;
    for(key in arguments){
        name = arguments[key];
        loader.addSound(name,"assets/audio/"+name+".mp3");
    }
};

H.centerY = function(el){
    var $self = $(el),
        $parent = $(el.parentNode),
        top = H.centerVal($parent.height(),$self.height());
    $self.css({
        top : top+"px"
    });
};

H.center = function(el){
    var $self = $(el),
        $parent = $(el.parentNode),
        left = H.centerVal($parent.width(),$self.width()),
        top = H.centerVal($parent.height(),$self.height());
    $self.css({
        left : left+"px",
        top : top+"px"
    });
};

//Create an element of type 'type' and style it
H.createEl = function (type, style, parent) {
    var el = document.createElement(type);
    for (i in style) {
        if (i == 'transform') {
            el.style[H.vendor + 'Transform'] = style[i];
        }
        else {
            el.style[i] = style[i];
        }
    }
    if (parent) {
        parent.appendChild(el);
    }
    return el;
};

H.createImg = function (src, style, parent, loader, elClass) {
    var el;
    if (loader) {
        el = loader.addImage(src);
    }else {
        el = new Image();
        el.src = src;
    }
    for (i in style) {
        if (i == 'transform') {
            el.style[H.vendor + 'Transform'] = style[i];
        }
        else {
            el.style[i] = style[i];
        }
    }

    if (elClass) {
        el.setAttribute('class', elClass);
    }
    if (parent) {
        parent.appendChild(el);
    }
    return el;
};

H.createVideo = function (src, style, parent, loader, elClass) {
    var el;
    if (loader) {
        el = loader.addVideo(src);
    } else {
        var el = document.createElement('video');
        el.src = src;
    }
    for (i in style) {
        if (i == 'transform') {
            el.style[H.vendor + 'Transform'] = style[i];
        }
        else {
            el.style[i] = style[i];
        }
    }

    if (elClass) {
        el.setAttribute('class', elClass);
    }
    if (parent) {
        parent.appendChild(el);
    }
    return el;
};

H.createLink = function (el, url, target) {
    var anchor = document.createElement('a');
    anchor.setAttribute('href', url);
    if (target) {
        anchor.setAttribute('target', target);
    }

    var elParent = $(el).parent()[0];
    elParent.removeChild(el);
    elParent.appendChild(anchor);
    anchor.appendChild(el);

    return anchor;
};

H.createScroll = function (el) {
    var ret;
    if (H.isTouch) {
        var rand = Math.floor(Math.random() * 1000);
        $(el).wrapInner('<div id="' + rand + 'viewport" />');
        $('#' + rand + 'viewport').css({
            height: $(el).height(),
            overflow: 'hidden'
        });
        ret = new iScroll($('#' + rand + 'viewport')[0], {
            vScrollbar: false,
            bounce: true
        });
    }
    else {
        ret = $(el).scrollpanel().data('scrollpanel');
    }
    return ret;
};

H.updateScroll = function (scroll) {
    if (scroll.refresh) {
        scroll.refresh();
    }
    else {
        scroll.update();
    }
};

//Create a div with clear:both as style
H.clear = function () {
    var clear = document.createElement('div');
    clear.style.clear = 'both';
    return clear;
};

H.resizeToContainer = function (image, container, imageRatio, centerH, centerV, scale) {
    var imgWidth, imgHeight;
    var cWidth = $(container).width();
    var cHeight = $(container).height()
    var cRatio = cWidth / cHeight;
    var cScale = 1;
    if (scale) {
        cScale = scale;
    }

    if (imageRatio > cRatio) {
        imgHeight = cHeight * cScale;
        imgWidth = imgHeight * imageRatio;
    }
    else {
        imgWidth = cWidth * cScale;
        imgHeight = imgWidth / imageRatio;
    }

    $(image).css('width', imgWidth + 'px');
    $(image).css('height', imgHeight + 'px');

    if (centerH == true || centerH == null) {
        $(image).css('left', ((cWidth - imgWidth) / 2) + 'px');
    }
    if (centerV == true || centerV == null) {
        $(image).css('top', ((cHeight - imgHeight) / 2) + 'px');
    }
};

H.distance = function (point1, point2) {
    var distancex = point1.x - point2.x;
    var distancey = point1.y - point2.y;
    return Math.sqrt((distancex * distancex) + (distancey * distancey));
};

