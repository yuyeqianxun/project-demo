function run(data,index) {
	$(data).animate({right:index*600+'px'}, 1000)
}
function init(){
	let imglist=$('#slide li')
	let content=$('#slide ul')
	let width=$(imglist[0]).width()*imglist.length
	let index=1
	content.css('width',width)
	setInterval(function(){
			run(content,index);			
			index===4?index=0:index++
	},2000);
}
