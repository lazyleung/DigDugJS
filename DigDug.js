window.canvas = document.getElementById("myCanvas");

// Get context of the canvas
window.ctx = canvas.getContext("2d");

var update = function(keyPress) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	drawSelection(keyPress);

	drawTitle();
}

var main = function() {
	update();
}

// ***** Draw Menu *****
// Draw title
var drawTitle = function() {
	ctx.fillStyle = "black";
	ctx.font = "55px Arial";
	ctx.textAlign = "center";
	ctx.fillText("Dig Dug", 300, 70);
	// Draw selectable options
	ctx.font = "40px Arial";
	ctx.fillText("Play", 300, 370);
	ctx.fillText("High Scores", 300, 450);
}

var drawSelection = function(direction) {
	// Draw selection rectangle
	ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
	if (direction == 38 && y != 320) {
		var x = 170;
		var y = 320;
		ctx.fillRect(x, y, 250, 70);
	}
	else if (direction == 40 && y != 420) {
		var x = 170;
		var y = 410;
		ctx.fillRect(x, y, 250, 70);
	}
	else {
		ctx.fillRect(x, y, 250, 70);
	}
}

// Handles Input Events
function onMouseDown(event) {
	var x = event.pageX - canvas.offsetLeft;
	var y = event.pageY - canvas.offsetTop;
	if(150 < x  && x < 250) {
		if(150 < y && y < 200) {
			;
		}
	}		
}
canvas.addEventListener('mousedown', onMouseDown, false);


function onKeyDown(event) {
    update(event.keyCode);
}
canvas.addEventListener('keydown', onKeyDown, false);
// make canvas focusable, then give it focus!
canvas.setAttribute('tabindex','0');
canvas.focus();

drawTitle();




