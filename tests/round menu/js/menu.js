/**
 * @author Linye
 * @date 2014/04/22
 */

/**
 * 创建菜单
 * @param {Object} Target   目标节点，菜单将在这个区域创建
 */
function nice_menu(Target)
{
	this.initScale = 0.5;
    this.delay = 1000;
    this.distributionType = 0; //默认0=averaged均匀分布，1=original原始分布
    this.gap = 1;              //2个扇形之间的间隙
    this.aSkew = -50;      //影响扇形的角度大小
    this.aRotate = -70;     //影响图片旋转后的位置
    this.liRotate = -10;    //影响扇形的旋转位置
    this.liSkew = 50;       //跟 this.aSkew 为反值时，才不会发生扭曲
	this.nm_Target = Target;
	this.nm_ItemsData = new Array();
	this.nm_ItemsData = [
		["DemoTitle",	//Title
		 "index.htm", 	//URL
		 "_blank",		//target
		 "1.png"]		//image's URL
	];
	
	if(typeof(this.initialized == "undefined")){
		this.nm_createMenu = function()
		{
		    this.nm_Target.innerHTML = "";
		    var itemCount = this.nm_ItemsData.length;
		    var liRotate = this.liRotate;
            var aSkew = this.aSkew;
            var liSkew = this.liSkew;
            var aRotate = this.aRotate;
            
		    switch(this.distributionType)
		    {
		        case 0:		//平均分布
		        {
		            var objSkew =   360 / itemCount - this.gap;
                    aSkew = objSkew - 90;
                    liSkew = 0 - aSkew;
                    aRotate =0 - ( (90 - objSkew) / 2 + 45);
                    break; 
		        }
		        case 1:		//原始分布
		        {
		        	/*
		        	var objSkew =   this.aSkew;
                    aSkew = objSkew;
                    liSkew = 0 - aSkew;
                    aRotate =0 - ( (90 - objSkew) / 2 + 45);
                    */
		            break;
		        }
		        default:
		        {
		            break;
		        }
		    }

			var ulNode = document.createElement("ul");
			for(var i = 0; i < itemCount; i++)
			{
			    var item = this.nm_ItemsData[i];
			    
			    //<li></li>
			    var liNode = document.createElement("li");
			    var lir = 0;
			    var lis = 0;
			    switch(this.distributionType)
                {
                    case 0: //平均分布
                    {
                        lir = liRotate + (360 / itemCount ) * i;    
                        lis = liSkew;
                        break;
                    }
                     case 1:
                    {
                    	lir = (90 - this.liSkew + this.gap ) * i + liRotate;    
                        lis = liSkew;
                        break;
                    }
                    default:
                    {
                        break;
                    }
                }
                
                function liTransform(liNode, lir, lis, initScale)
                {
                	var finalScale = 1.0 / initScale;
                    liNode.style  = "transform:rotate(" + lir + "deg) skew(" + lis + "deg) scale(" + finalScale + ");";
                    liNode.style.cssText += "-webkit-transform:rotate(" + lir + "deg) skew(" + lis+ "deg) scale(" + finalScale + ");";
                    liNode.style.cssText += "-ms-transform:rotate(" + lir + "deg) skew(" + lis+ "deg) scale(" + finalScale + ");";
                    liNode.style.cssText += "-o-transform:rotate(" + lir + "deg) skew(" + lis+ "deg) scale(" + finalScale + ");";
                }
			    
			    setTimeout(liTransform, this.delay, liNode, lir, lis, this.initScale);
			    
                liNode.style  = "transform:rotate(" + this.liRotate + "deg) skew(" + liSkew + "deg) scale(" + this.initScale + ");";
                liNode.style.cssText += "-webkit-transform:rotate(" + this.liRotate + "deg) skew(" + liSkew + "deg) scale(" + this.initScale + ");";
                liNode.style.cssText += "-ms-transform:rotate(" + this.liRotate + "deg) skew(" + liSkew + "deg) scale(" + this.initScale + ");";
                liNode.style.cssText += "-o-transform:rotate(" + this.liRotate + "deg) skew(" + liSkew + "deg) scale(" + this.initScale + ");";		    
 
                //<a></a>
			    var aNode = document.createElement("a");
			    aNode.href = item[1];
			    aNode.target = item[2];
			    aNode.style  = "transform: skew(" + aSkew  +  "deg) rotate(" + aRotate  +"deg)  scale(" + this.initScale + ");";
			    aNode.style.cssText  += "-webkit-transform: skew(" + aSkew  +  "deg) rotate(" + aRotate  +"deg)  scale(" + this.initScale + ");";
			    aNode.style.cssText  += "-ms-transform: skew(" + aSkew  +  "deg) rotate(" + aRotate  +"deg)  scale(" + this.initScale + ");";
			    aNode.style.cssText  += "-o-transform: skew(" + aSkew  +  "deg) rotate(" + aRotate  +"deg)  scale(" + this.initScale + ");";
			    
			    //<img></img>
			    var imgNode = document.createElement("img");
			    imgNode.src = item[3];
			    imgNode.title = item[0];
			    
			    //加入节点
			    aNode.appendChild(imgNode);
			    liNode.appendChild(aNode);
			    ulNode.appendChild(liNode);
			}
           
			this.nm_Target.appendChild(ulNode);
		};
		
		this.nm_showMenu = function(bShow)
		{
			if(bShow)
			{
				alert("Show");
			}
			else
			{
				alert("Hide");
			}
		};
	}
	
	this.initialized = true;
}

