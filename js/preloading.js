$(document).ready(function(){

	var preload = $('.preload');
	var loading = 0;
	var id = setInterval(frame, 64);

	function frame (){
		if (loading == 200){
			clearInterval(id);
			window.open("mainpc.html","_self");
		}
		else{
			loading = loading + 1;
			if(loading == 95){
				preload.fadeOut("1");
			}
		}
}
});