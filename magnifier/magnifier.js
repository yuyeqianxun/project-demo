;(function($, window, document, undefined) {
    var pluginName = "Magnifier",
    defaults = {
    	proportion:2
    };
    function Magnifier(element, options) {
        this.element = element;
        this.sPro=$(this.element).find('.small-product')
        this.bPro=$(this.element).find('.big-product')
        this.cover=$(this.element).find('.cover')
        this.img =$(this.element).find('.big-product img')
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.version = 'v1.0.0';
        this.init();
    }
    Magnifier.prototype = {
        init:function() {
            const _this=this           
            _this.sPro.mousemove(function(event){
                _this.show_coords(event)
            })
            _this.sPro.mouseout(function(){
                _this.hide_coords()
            })
        },
        show_coords:function(event){
            X=event.clientX-this.sPro.offset().left
            Y=event.clientY-this.sPro.offset().top
            this.show(X,Y)   
        },
        move:function(x,y){
            const proportion=this.settings.proportion
            this.bPro.css({"display":"block" })
            this.img.css({ "left": -x*proportion, "top": -y*proportion, })
        },
        show:function(x,y){       
            positionX=x-this.cover.width()/2
            positionX>0?positionX:positionX=0
            positionX<this.sPro.width()/2?positionX:positionX=this.sPro.width()/2
            positionY=y-this.cover.width()/2
            positionY>0?positionY:positionY=0
            positionY<this.sPro.width()/2?positionY:positionY=this.sPro.width()/2
            this.cover.css({ "left": positionX, "top": positionY, "display":"block" })
            this.move(positionX,positionY)           
        },
        hide_coords:function(){
            this.bPro.css({"display":"none" })
            this.cover.css({"display":"none" })
        }
    };
    $.fn[pluginName] = function(options) {
        this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Magnifier(this, options));
            }
        });
        return this;
    };
})(jQuery, window, document);