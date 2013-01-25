var applicationManager () {

	window.canvas = document.getElementById("myCanvas");
	window.ctx = canvas.getContext("2d");

	//  Handles keybaord events
	function onKeyDown(event) {
	    update(event.keyCode);
	}

	// Handles mouse input events
	function onMouseDown(event) {
		var x = event.pageX - canvas.offsetLeft;
		var y = event.pageY - canvas.offsetTop;
		if(150 < x  && x < 250) {
			if(150 < y && y < 200) {
				;
			}
		}		
	}
	canvas.addEventListener('keydown', onKeyDown, false);
	// make canvas focusable, then give it focus!
	canvas.setAttribute('tabindex','0');
	canvas.focus();


}