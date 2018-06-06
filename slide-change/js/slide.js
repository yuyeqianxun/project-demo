;(function($, window, document, undefined) {
    var pluginName = "Slide",
    defaults = {
    	pagination:true,
        interval:2000,
        length:9
    };
    function Slide(element, options) {
        this.element = element;
        this.startX = 0;
        this.endX = 0;
        this.X = 0;
        this.index = 0        
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this.tab = $(this.element).find('.tab ul');
        this.tabItem = $(this.element).find('.tab ul .tab-item');
        this.content = $(this.element).find('.content ul');
        this.conItem = $(document).width();

        this._name = pluginName;
        this.version = 'v1.0.0';
        this.init();
    }
    Slide.prototype = {
        init: function() {
            let length = this.tabItem.length*this.conItem,
                _this = this;
            this.addActive(this.index);     
            this.content.width(length);          
            this.content
              .on('touchstart',function(e){
                _this.touch(e);
            }).on('touchmove',function(e){
                _this.touch(e);
            }).on('touchend',function(e){
                _this.touch(e);
            })
            this.tab.on('click',function(e){
                _this.clickTab(e)
            })
        },
        touch: function(event){ 
            var event = event || window.event; 
            switch(event.type){ 
                case "touchstart": 
                    this.startX = event.originalEvent.touches[0].pageX;
                    break; 
                case "touchend":
                    var time=null
                    this.touchEnd()
                    let _this=this
                    time=setTimeout(function(){
                        _this.content.css('transition','transform')
                    },500)
        　　　　　　　break; 
                case "touchmove":                   
                    this.endX = event.originalEvent.touches[0].pageX;
                    this.X = this.conItem*this.index+this.startX-this.endX
                    if(this.X<0){
                        this.X=0
                    }else if(this.X>(this.tabItem.length-1)*this.conItem){
                        this.X=(this.tabItem.length-1)*this.conItem
                    }
                    this.content.css('transform',"translateX("+(-this.X)+"px)");
        　　　　　　 break;             
            }
        },
        touchEnd: function(){
            if(this.endX-this.startX>150){
                if(this.index===0){
                    return
                }
                this.index--;           
            }else if(this.endX-this.startX<-150){
                if(this.index===(this.tabItem.length-1)){
                    return
                }
                this.index++;              
            }
            let length=this.conItem*this.index
            let left=this.tabItem.eq(this.index).offset().left
            let right=left+this.tabItem.width()
            let moveL=$(".tab").scrollLeft()+right-this.conItem
            let moveR=$(".tab").scrollLeft()+left
            if(this.conItem-left<this.tabItem.width()){
                $(".tab").animate({scrollLeft:moveL},500)
            }else if(right<this.tabItem.width()){
                $(".tab").animate({scrollLeft:moveR},500)
            }     
            this.content.css({
                'transform':"translateX("+(-length)+"px)",
                'transition':'transform 0.5s linear'
            })
            this.addActive(this.index)
        },
        clickTab: function(e){
            var e = e||window.event;  
            var tar = e.target;
            var length;
            if(tar.nodeName === 'LI') {        
                this.index=$(tar).index()
                this.addActive(this.index)
                length=this.conItem*this.index
                this.content.css({
                    'transform':"translateX("+(-length)+"px)",
                })
            }  
        },
        addActive: function(i){
            this.tabItem.eq(i).css('color','red').siblings().css('color','black')
        }
    };
    $.fn[pluginName] = function(options) {
        this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Slide(this, options));
            }
        });
        return this;
    };
})(jQuery, window, document);