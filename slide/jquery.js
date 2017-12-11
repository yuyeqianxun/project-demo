;(function($, window, document, undefined) {
    var pluginName = "Slide",
        defaults = {
        	prev:'.prev',
        	next:'.next',
        	pagination:'true',
        	interval:2000
        };
    function Slide(element, options) {
        this.element = element;
        this.width = $(this.element).find('ul li img')[0].width;
        this.length = $(this.element).find('ul li').length+1;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.version = 'v1.0.0';
        this.init();
    }
    Slide.prototype = {
        init: function() {
        	let index=1
        	this.creat()
        	this.settings.pagination?this.pagination():''
        	this.add(1)       	
        	const content = $(this.element).find('ul')
        	content.css('width',this.width*this.length)
        	this.autoplay(content,index)
        },
        autoplay: function(content,index) {
        	const _this=this
           	timer=setInterval(function(){
				_this.run(content,index)
				if(index===_this.length-1){
					$(content).animate({right:0+'px'}, 0)
					index=1
				}else{
					index++
				}
				_this.add(index)
			},_this.settings.interval)				
        },
        run: function(data,index) {
        	$(data).animate({right:index*this.width+'px'}, 1000)
        },
        creat: function(){
        	$($(this.element).find('ul li')[0]).clone().appendTo($(this.element).find('ul'))
        },
        add: function(index){
        	let active=$(this.element).find('ul li')[index-1]
        	$(active).addClass('active').siblings().removeClass('active')
        	if(this.settings.pagination){
        		let conActive=$(this.element).find('ol li')[index-1]
        		$(conActive).addClass('conActive').siblings().removeClass('conActive')
        	}
        },
        pagination: function(index){
        	let ol="<ol></ol>"
        	$(this.element).append(ol)
        	let li="<li></li>"
			for(i=1;i<this.length;i++){
				$(this.element).find('ol').append(li)
			}			 
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
