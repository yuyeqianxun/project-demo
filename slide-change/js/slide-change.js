;(function($, window, document, undefined) {
    var pluginName = "Slide",
    defaults = {
    	pagination:true,
        interval:2000
    };
    function Slide(element, options) {
        this.element = element;
        this.startX = 0;
        this.endX = 0;
        this.X = 0;
        this.index = 0        
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.version = 'v1.0.0';
        this.init();
    }
    Slide.prototype = {
        init: function() {
            const _this=this;
            const width=$(document).width()
            const tabWidth=$(this.element).find('.tab ul li').width()
            $(this.element).find('.content ul').css('width',width*9);
            $(this.element).find('.tab ul').css('width',tabWidth*9);
            let index=1;
            $(this.element).on('touchstart',function(e){_this.touchStart(e)})
            $(this.element).on('touchmove',function(e){
                _this.touchMove(e)
                _this.move(_this.X)
            })
            $(this.element).on('touchend',function(e){_this.touchEnd(e)})
        },
        touchStart: function(event){
            this.startX = event.originalEvent.changedTouches[0].clientX;
            $(this.element).find('.content ul').css('transition','transform 0s')
        },
        touchMove: function(event){
            const moveEndX = event.originalEvent.changedTouches[0].pageX;
            this.X = this.startX-moveEndX;
        },
        touchEnd: function(event){
            this.endX = event.originalEvent.changedTouches[0].clientX;
            if(this.index===0){
                this.X<0?'':this.recOrNext(this.X)
            }else if(this.index===8){
                this.X>0?'':this.recOrNext(this.X)
            }else{
                this.recOrNext(this.X)
            }
        },
        move: function(x){
            const width=$(document).width()
            if(this.index===0){
                x<0?x=0:x
            }else if(this.index===8){
                x>0?x=0:x
            }
            const moveX=width*this.index+x            
            $(this.element).find('.content ul').css('transform',"translate("+(-moveX)+"px,0)")
        },
        recOrNext: function(x){
            const width=$(document).width()            
            if(x>150){//前进
                this.index++
                const moveX=width*this.index
                $(this.element).find('.content ul').css({'transition':'transform 0.5s','transform':"translate("+(-moveX)+"px,0)"})               
            }else if(x<-150){//回去
                this.index--
                const moveX=width*this.index
                $(this.element).find('.content ul').css({'transition':'transform 0.5s','transform':"translate("+(-moveX)+"px,0)"})               
            }else{
                const back=width*this.index
                $(this.element).find('.content ul').css({'transition':'transform 0.5s','transform':"translate("+(-back)+"px,0)"}) 
            }
            const active=$(this.element).find('.tab ul li')[this.index]
            $(active).addClass('tab-active').siblings().removeClass('tab-active')
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