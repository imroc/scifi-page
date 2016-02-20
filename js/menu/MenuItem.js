CPWL.MenuItem = function(parent,title,page){
    this.el = H.createEl("div",{
        paddingTop : "5px",
        paddingBottom : "5px",
        cursor : "pointer",
        textAlign : "center",
        width : "100px",
        color : "white",
        backgroundColor : '#00E0FF',
        font : "Arial",
        fontWeight : "bolder",
        margin : "10px",
        float : "left",
        borderRadius : "3px",
        visibility : "hidden"
    },parent.wrapper);
    this.el.innerHTML = title;
    this.page = page;
    this.parent = parent;
    this.init();
};

CPWL.MenuItem.prototype = {
    constructor : CPWL.MenuItem,
    init : function(){
        var me = this;
        var hoverAnimation = TweenLite.to(this.el,0.15,{
            autoAlpha : 1,
            scaleY : 1.2,
            paused : true
        });
        //hover
        $(this.el).hover(function(){
            hoverAnimation.play();
        },function(){
            hoverAnimation.reverse();
        });

        $(this.el).click(function(){
            //soundManager.play("click");
            //在stage中显示对应的东西
                if(!me.page.isBusy){
                    me.page.toggle();
            }
        });
    }
};