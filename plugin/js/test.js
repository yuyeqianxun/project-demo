;(function($, window, document,undefined) {
	    //定义Beautifier的构造函数
	    var ListCommon2=function(afirst)
		{
			this.first=afirst;
			this.do1=function (){    
				alert("first do"+first);
			}              

		}  
	    //定义Beautifier的方法
	    ListCommon2.prototype = {
	    	do2:function(){ 
	    		console.log(this)   
			 	console.log(this.first)
			}
	    }
	    //在插件中使用Beautifier对象
	    $.fn.test = function(options) {
	        //创建Beautifier的实体
	        var listCommon2 = new ListCommon2(this);
	        //调用其方法
	        return listCommon2.do2();
	    }
})(jQuery, window, document);